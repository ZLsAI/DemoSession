const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const {
  checkAppointmentConflict,
  validateFutureDateTime,
  parseDateRange
} = require('../utils/dateUtils');

/**
 * GET /api/appointments
 * Get all appointments with optional filters
 * Query params: startDate, endDate, patientId, doctorName, status
 */
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, patientId, doctorName, status } = req.query;
    
    // Build query object
    const query = {};
    
    // Date range filter
    if (startDate || endDate) {
      const dateRange = parseDateRange(startDate, endDate);
      if (dateRange) {
        query.appointmentDate = dateRange;
      }
    }
    
    // Patient filter
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
    
    const appointments = await Appointment.find(query).sort({ appointmentDate: 1, appointmentTime: 1 });
    
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
    const appointment = await Appointment.findById(req.params.id);
    
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
    const appointmentData = req.body;
    
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
    const existingAppointments = await Appointment.find({
      doctorName: appointmentData.doctorName,
      status: { $ne: 'cancelled' }
    });
    
    if (checkAppointmentConflict(existingAppointments, appointmentData)) {
      return res.status(409).json({
        success: false,
        message: 'Appointment conflict detected',
        error: 'The selected time slot conflicts with an existing appointment for this doctor'
      });
    }
    
    // Create appointment
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
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
    const updateData = req.body;
    
    // Find existing appointment
    const existingAppointment = await Appointment.findById(appointmentId);
    
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
      const conflictingAppointments = await Appointment.find({
        doctorName: appointmentToCheck.doctorName,
        status: { $ne: 'cancelled' }
      });
      
      if (checkAppointmentConflict(conflictingAppointments, appointmentToCheck, appointmentId)) {
        return res.status(409).json({
          success: false,
          message: 'Appointment conflict detected',
          error: 'The updated time slot conflicts with an existing appointment for this doctor'
        });
      }
    }
    
    // Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
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
    const appointment = await Appointment.findByIdAndUpdate(
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
