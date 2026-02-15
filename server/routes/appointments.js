const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const {
  checkAppointmentConflict,
  validateFutureDateTime,
  parseDateRange
} = require('../utils/dateUtils');
const {
  sanitizeQuery,
  sanitizeAppointmentData
} = require('../utils/sanitize');

// Helper to get the appropriate data store
function getDataStore(req) {
  return req.app.locals.inMemoryStore || Appointment;
}

/**
 * GET /api/appointments
 * Get all appointments with optional filters
 * Query params: startDate, endDate, patientId, doctorName, status
 */
router.get('/', async (req, res) => {
  try {
    // Sanitize query parameters to prevent injection attacks
    const sanitizedQuery = sanitizeQuery(req.query);
    const { startDate, endDate, patientId, doctorName, status } = sanitizedQuery;
    const dataStore = getDataStore(req);
    
    // Build query object
    const query = {};
    
    // Date range filter
    if (startDate || endDate) {
      const dateRange = parseDateRange(startDate, endDate);
      if (dateRange) {
        query.appointmentDate = dateRange;
      }
    }
    
    // Patient filter (note: in production, consider using POST for sensitive data)
    if (patientId) {
      query.patientId = patientId;
    }
    
    // Doctor filter
    if (doctorName) {
      query.doctorName = doctorName;
    }
    
    // Status filter
    if (status) {
      query.status = status;
    }
    
    // Execute query with sort
    const queryResult = await dataStore.find(query);
    const appointments = queryResult.sort ? 
      await queryResult.sort({ appointmentDate: 1, appointmentTime: 1 }) : 
      queryResult;
    
    res.json({
      success: true,
      message: 'Appointments retrieved successfully',
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve appointments',
      error: error.message
    });
  }
});

/**
 * GET /api/appointments/:id
 * Get a single appointment by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const dataStore = getDataStore(req);
    const appointment = await dataStore.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
        error: 'No appointment exists with the provided ID'
      });
    }
    
    res.json({
      success: true,
      message: 'Appointment retrieved successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve appointment',
      error: error.message
    });
  }
});

/**
 * POST /api/appointments
 * Create a new appointment with conflict detection
 */
router.post('/', async (req, res) => {
  try {
    // Sanitize input data
    const appointmentData = sanitizeAppointmentData(req.body);
    const dataStore = getDataStore(req);
    
    // Validate future date/time for new appointments
    if (!validateFutureDateTime(
      appointmentData.appointmentDate,
      appointmentData.appointmentTime,
      appointmentData.status || 'scheduled'
    )) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Appointments must be scheduled for a future date and time'
      });
    }
    
    // Check for conflicts with existing appointments
    const existingAppointments = await dataStore.find({
      doctorName: appointmentData.doctorName,
      status: { $ne: 'cancelled' }
    });
    
    // Get the array of appointments (handle both Mongoose and in-memory)
    const apptArray = Array.isArray(existingAppointments) ? existingAppointments : 
                      (existingAppointments.sort ? await existingAppointments.sort({}) : []);
    
    if (checkAppointmentConflict(apptArray, appointmentData)) {
      return res.status(409).json({
        success: false,
        message: 'Appointment conflict detected',
        error: 'The selected time slot conflicts with an existing appointment for this doctor'
      });
    }
    
    // Create appointment
    let appointment;
    if (req.app.locals.inMemoryStore) {
      appointment = await dataStore.create(appointmentData);
    } else {
      appointment = new Appointment(appointmentData);
      await appointment.save();
    }
    
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
      error: error.message
    });
  }
});

/**
 * PUT /api/appointments/:id
 * Update an existing appointment with conflict re-check
 */
router.put('/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    // Sanitize update data
    const updateData = sanitizeAppointmentData(req.body);
    const dataStore = getDataStore(req);
    
    // Find existing appointment
    const existingAppointment = await dataStore.findById(appointmentId);
    
    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
        error: 'No appointment exists with the provided ID'
      });
    }
    
    // Check if date/time or doctor changed - need to re-check conflicts
    const dateTimeChanged = (
      updateData.appointmentDate && updateData.appointmentDate !== existingAppointment.appointmentDate.toISOString() ||
      updateData.appointmentTime && updateData.appointmentTime !== existingAppointment.appointmentTime ||
      updateData.doctorName && updateData.doctorName !== existingAppointment.doctorName ||
      updateData.duration && updateData.duration !== existingAppointment.duration
    );
    
    if (dateTimeChanged) {
      // Merge update data with existing data for conflict check
      const appointmentToCheck = {
        appointmentDate: updateData.appointmentDate || existingAppointment.appointmentDate,
        appointmentTime: updateData.appointmentTime || existingAppointment.appointmentTime,
        doctorName: updateData.doctorName || existingAppointment.doctorName,
        duration: updateData.duration || existingAppointment.duration
      };
      
      // Validate future date/time if scheduling or confirming
      const newStatus = updateData.status || existingAppointment.status;
      if (!validateFutureDateTime(
        appointmentToCheck.appointmentDate,
        appointmentToCheck.appointmentTime,
        newStatus
      )) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Appointments must be scheduled for a future date and time'
        });
      }
      
      // Check for conflicts (excluding current appointment)
      const conflictingAppointments = await dataStore.find({
        doctorName: appointmentToCheck.doctorName,
        status: { $ne: 'cancelled' }
      });
      
      // Get the array of appointments (handle both Mongoose and in-memory)
      const apptArray = Array.isArray(conflictingAppointments) ? conflictingAppointments : 
                        (conflictingAppointments.sort ? await conflictingAppointments.sort({}) : []);
      
      if (checkAppointmentConflict(apptArray, appointmentToCheck, appointmentId)) {
        return res.status(409).json({
          success: false,
          message: 'Appointment conflict detected',
          error: 'The updated time slot conflicts with an existing appointment for this doctor'
        });
      }
    }
    
    // Update appointment
    const updatedAppointment = await dataStore.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment',
      error: error.message
    });
  }
});

/**
 * DELETE /api/appointments/:id
 * Soft delete appointment by setting status to 'cancelled'
 */
router.delete('/:id', async (req, res) => {
  try {
    const dataStore = getDataStore(req);
    const appointment = await dataStore.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
        error: 'No appointment exists with the provided ID'
      });
    }
    
    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment',
      error: error.message
    });
  }
});

module.exports = router;
