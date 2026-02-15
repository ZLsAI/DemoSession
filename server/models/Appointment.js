const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: [true, 'Patient ID is required']
  },
  patientName: {
    type: String,
    required: [true, 'Patient name is required']
  },
  doctorName: {
    type: String,
    required: [true, 'Doctor name is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    validate: {
      validator: function(v) {
        // Validate HH:MM format (24-hour)
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: props => `${props.value} is not a valid time format. Use HH:MM (24-hour format)`
    }
  },
  duration: {
    type: Number,
    default: 30,
    min: [5, 'Duration must be at least 5 minutes'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  reason: {
    type: String,
    required: [true, 'Reason for visit is required']
  },
  status: {
    type: String,
    enum: {
      values: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
      message: '{VALUE} is not a valid status'
    },
    default: 'scheduled'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
appointmentSchema.index({ appointmentDate: 1, doctorName: 1 });
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ status: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
