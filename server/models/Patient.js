const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: ''
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    trim: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
    default: ''
  },
  allergies: [{
    type: String,
    trim: true
  }],
  medicalHistory: {
    type: String,
    trim: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  assignedDoctor: {
    type: String,
    trim: true
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    }
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create indexes for search functionality
patientSchema.index({ firstName: 1, lastName: 1, contactNumber: 1 });

const Patient = mongoose.model('Patient', patientSchema);

// In-memory storage for when MongoDB is not available
class InMemoryPatient {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = data.gender || '';
    this.contactNumber = data.contactNumber;
    this.email = data.email || '';
    this.address = data.address || '';
    this.bloodType = data.bloodType || '';
    this.allergies = data.allergies || [];
    this.medicalHistory = data.medicalHistory || '';
    this.admissionDate = data.admissionDate || new Date();
    this.assignedDoctor = data.assignedDoctor || '';
    this.emergencyContact = data.emergencyContact || {};
    this.isDeleted = data.isDeleted || false;
    this.deletedAt = data.deletedAt || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      contactNumber: this.contactNumber,
      email: this.email,
      address: this.address,
      bloodType: this.bloodType,
      allergies: this.allergies,
      medicalHistory: this.medicalHistory,
      admissionDate: this.admissionDate,
      assignedDoctor: this.assignedDoctor,
      emergencyContact: this.emergencyContact,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = {
  Patient,
  InMemoryPatient
};
