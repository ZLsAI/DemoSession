const express = require('express');
const router = express.Router();
const { Patient, InMemoryPatient } = require('../models/Patient');
const { validatePatientData } = require('../utils/validation');
const { isUsingInMemory, getInMemoryStorage } = require('../config/database');

/**
 * POST /api/patients - Create new patient
 */
router.post('/', async (req, res) => {
  try {
    // Validate patient data
    const validation = validatePatientData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: validation.errors.join('; ')
      });
    }

    if (isUsingInMemory()) {
      // In-memory storage
      const storage = getInMemoryStorage();
      const patient = new InMemoryPatient(req.body);
      storage.set(patient.id, patient);
      
      return res.status(201).json({
        success: true,
        message: 'Patient created successfully',
        data: patient.toJSON()
      });
    } else {
      // MongoDB storage
      const patient = new Patient(req.body);
      await patient.save();
      
      return res.status(201).json({
        success: true,
        message: 'Patient created successfully',
        data: patient
      });
    }
  } catch (error) {
    console.error('Error creating patient:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create patient',
      error: error.message
    });
  }
});

/**
 * GET /api/patients - Get all patients with optional search
 */
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    if (isUsingInMemory()) {
      // In-memory storage
      const storage = getInMemoryStorage();
      let patients = Array.from(storage.values())
        .filter(p => !p.isDeleted)
        .map(p => p.toJSON());

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        patients = patients.filter(p => 
          p.firstName.toLowerCase().includes(searchLower) ||
          p.lastName.toLowerCase().includes(searchLower) ||
          p.contactNumber.includes(search)
        );
      }

      return res.status(200).json({
        success: true,
        message: 'Patients retrieved successfully',
        data: patients
      });
    } else {
      // MongoDB storage
      let query = { isDeleted: false };

      // Apply search filter
      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { contactNumber: { $regex: search, $options: 'i' } }
        ];
      }

      const patients = await Patient.find(query).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: 'Patients retrieved successfully',
        data: patients
      });
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch patients',
      error: error.message
    });
  }
});

/**
 * GET /api/patients/:id - Get single patient by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingInMemory()) {
      // In-memory storage
      const storage = getInMemoryStorage();
      const patient = storage.get(id);

      if (!patient || patient.isDeleted) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found',
          error: 'No patient found with the given ID'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Patient retrieved successfully',
        data: patient.toJSON()
      });
    } else {
      // MongoDB storage
      const patient = await Patient.findOne({ _id: id, isDeleted: false });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found',
          error: 'No patient found with the given ID'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Patient retrieved successfully',
        data: patient
      });
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    
    // Handle invalid ObjectId format for MongoDB
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
        error: 'Invalid patient ID format'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch patient',
      error: error.message
    });
  }
});

/**
 * PUT /api/patients/:id - Update patient
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate patient data (excluding required fields check for updates)
    const { isValidEmail, isValidDateOfBirth } = require('../utils/validation');
    
    if (req.body.email && !isValidEmail(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Invalid email format'
      });
    }

    if (req.body.dateOfBirth && !isValidDateOfBirth(req.body.dateOfBirth)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Date of birth must be a valid date in the past'
      });
    }

    if (isUsingInMemory()) {
      // In-memory storage
      const storage = getInMemoryStorage();
      const patient = storage.get(id);

      if (!patient || patient.isDeleted) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found',
          error: 'No patient found with the given ID'
        });
      }

      // Update patient fields
      Object.keys(req.body).forEach(key => {
        if (key !== 'id' && key !== 'createdAt') {
          patient[key] = req.body[key];
        }
      });
      patient.updatedAt = new Date();

      return res.status(200).json({
        success: true,
        message: 'Patient updated successfully',
        data: patient.toJSON()
      });
    } else {
      // MongoDB storage
      const patient = await Patient.findOne({ _id: id, isDeleted: false });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found',
          error: 'No patient found with the given ID'
        });
      }

      // Update patient fields
      Object.keys(req.body).forEach(key => {
        if (key !== '_id' && key !== 'createdAt') {
          patient[key] = req.body[key];
        }
      });

      await patient.save();

      return res.status(200).json({
        success: true,
        message: 'Patient updated successfully',
        data: patient
      });
    }
  } catch (error) {
    console.error('Error updating patient:', error);
    
    // Handle invalid ObjectId format for MongoDB
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
        error: 'Invalid patient ID format'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update patient',
      error: error.message
    });
  }
});

/**
 * DELETE /api/patients/:id - Soft delete patient
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingInMemory()) {
      // In-memory storage
      const storage = getInMemoryStorage();
      const patient = storage.get(id);

      if (!patient || patient.isDeleted) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found',
          error: 'No patient found with the given ID'
        });
      }

      // Soft delete
      patient.isDeleted = true;
      patient.deletedAt = new Date();
      patient.updatedAt = new Date();

      return res.status(200).json({
        success: true,
        message: 'Patient deleted successfully',
        data: { id: patient.id }
      });
    } else {
      // MongoDB storage
      const patient = await Patient.findOne({ _id: id, isDeleted: false });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found',
          error: 'No patient found with the given ID'
        });
      }

      // Soft delete
      patient.isDeleted = true;
      patient.deletedAt = new Date();
      await patient.save();

      return res.status(200).json({
        success: true,
        message: 'Patient deleted successfully',
        data: { id: patient._id }
      });
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    
    // Handle invalid ObjectId format for MongoDB
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
        error: 'Invalid patient ID format'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to delete patient',
      error: error.message
    });
  }
});

module.exports = router;
