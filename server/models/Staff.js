const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['Doctor', 'Nurse', 'Administrator', 'Technician', 'Receptionist', 'Other'],
      message: '{VALUE} is not a valid role'
    }
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['Emergency', 'Cardiology', 'Pediatrics', 'Surgery', 'Radiology', 'Administration', 'Other'],
      message: '{VALUE} is not a valid department'
    }
  },
  specialization: {
    type: String,
    trim: true
  },
  qualifications: [{
    type: String,
    trim: true
  }],
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  employmentDate: {
    type: Date,
    default: Date.now
  },
  employmentStatus: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'on-leave'],
      message: '{VALUE} is not a valid employment status'
    },
    default: 'active'
  },
  availability: {
    monday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    },
    tuesday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    },
    wednesday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    },
    thursday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    },
    friday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    },
    saturday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    },
    sunday: {
      available: { type: Boolean, default: false },
      hours: { type: String, default: '' }
    }
  },
  emergencyContact: {
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phoneNumber: { type: String, trim: true }
  }
}, {
  timestamps: true
});

// Index for faster queries
staffSchema.index({ email: 1 });
staffSchema.index({ role: 1, department: 1 });
staffSchema.index({ employmentStatus: 1 });

module.exports = mongoose.model('Staff', staffSchema);
