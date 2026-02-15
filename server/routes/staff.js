const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const { isStaffAvailable } = require('../utils/staffUtils');

/**
 * POST /api/staff
 * Create a new staff member
 */
router.post('/', async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json({
      success: true,
      message: 'Staff member created successfully',
      data: staff
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      return res.status(409).json({
        success: false,
        message: 'A staff member with this email already exists',
        error: 'Duplicate email'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating staff member',
      error: error.message
    });
  }
});

/**
 * GET /api/staff
 * Get all staff members with optional filters
 * Query params: role, department, status, available, search
 */
router.get('/', async (req, res) => {
  try {
    const { role, department, status, available, search } = req.query;
    const query = {};

    // Apply filters
    if (role) {
      query.role = role;
    }
    if (department) {
      query.department = department;
    }
    if (status) {
      query.employmentStatus = status;
    }
    if (search) {
      // Search by first name or last name (case-insensitive)
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    let staffList = await Staff.find(query).sort({ lastName: 1, firstName: 1 });

    // Filter by availability if requested
    if (available === 'true') {
      staffList = staffList.filter(staff => isStaffAvailable(staff));
    }

    res.json({
      success: true,
      count: staffList.length,
      data: staffList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching staff members',
      error: error.message
    });
  }
});

/**
 * GET /api/staff/:id
 * Get a single staff member by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid staff ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching staff member',
      error: error.message
    });
  }
});

/**
 * PUT /api/staff/:id
 * Update a staff member
 */
router.put('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: 'Staff member updated successfully',
      data: staff
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A staff member with this email already exists',
        error: 'Duplicate email'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid staff ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating staff member',
      error: error.message
    });
  }
});

/**
 * DELETE /api/staff/:id
 * Soft delete a staff member (set status to 'inactive')
 */
router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { employmentStatus: 'inactive' },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: 'Staff member deactivated successfully',
      data: staff
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid staff ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deactivating staff member',
      error: error.message
    });
  }
});

module.exports = router;
