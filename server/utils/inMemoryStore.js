/**
 * In-memory storage implementation for appointments
 * Provides a simple alternative when MongoDB is not available
 */

class InMemoryAppointmentStore {
  constructor() {
    this.appointments = new Map();
    this.nextId = 1;
  }

  // Generate a unique ID
  generateId() {
    return String(this.nextId++);
  }

  // Validate appointment data
  validate(data) {
    const errors = [];

    if (!data.patientId) errors.push('Patient ID is required');
    if (!data.patientName) errors.push('Patient name is required');
    if (!data.doctorName) errors.push('Doctor name is required');
    if (!data.appointmentDate) errors.push('Appointment date is required');
    if (!data.appointmentTime) errors.push('Appointment time is required');
    if (!data.reason) errors.push('Reason for visit is required');

    // Validate time format (HH:MM)
    if (data.appointmentTime && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(data.appointmentTime)) {
      errors.push(`${data.appointmentTime} is not a valid time format. Use HH:MM (24-hour format)`);
    }

    // Validate duration
    if (data.duration !== undefined) {
      if (data.duration < 5) errors.push('Duration must be at least 5 minutes');
      if (data.duration > 480) errors.push('Duration cannot exceed 8 hours');
    }

    // Validate status
    const validStatuses = ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push(`${data.status} is not a valid status`);
    }

    if (errors.length > 0) {
      const error = new Error(errors.join(', '));
      error.name = 'ValidationError';
      error.errors = errors.reduce((acc, msg, idx) => {
        acc[`field${idx}`] = { message: msg };
        return acc;
      }, {});
      throw error;
    }
  }

  // Create a new appointment
  async create(data) {
    this.validate(data);

    const appointment = {
      _id: this.generateId(),
      patientId: data.patientId,
      patientName: data.patientName,
      doctorName: data.doctorName,
      appointmentDate: new Date(data.appointmentDate),
      appointmentTime: data.appointmentTime,
      duration: data.duration || 30,
      reason: data.reason,
      status: data.status || 'scheduled',
      notes: data.notes || '',
      createdAt: new Date()
    };

    this.appointments.set(appointment._id, appointment);
    return appointment;
  }

  // Find appointments with query
  async find(query = {}) {
    let results = Array.from(this.appointments.values());

    // Apply filters
    if (query.patientId) {
      results = results.filter(a => a.patientId === query.patientId);
    }

    if (query.doctorName) {
      results = results.filter(a => a.doctorName === query.doctorName);
    }

    if (query.status) {
      if (query.status.$ne) {
        results = results.filter(a => a.status !== query.status.$ne);
      } else {
        results = results.filter(a => a.status === query.status);
      }
    }

    if (query.appointmentDate) {
      if (query.appointmentDate.$gte) {
        results = results.filter(a => a.appointmentDate >= query.appointmentDate.$gte);
      }
      if (query.appointmentDate.$lte) {
        results = results.filter(a => a.appointmentDate <= query.appointmentDate.$lte);
      }
    }

    return {
      sort: function(sortObj) {
        // Sort by appointmentDate and appointmentTime
        if (sortObj.appointmentDate || sortObj.appointmentTime) {
          results.sort((a, b) => {
            const dateCompare = a.appointmentDate - b.appointmentDate;
            if (dateCompare !== 0) return dateCompare;
            return a.appointmentTime.localeCompare(b.appointmentTime);
          });
        }
        return Promise.resolve(results);
      }
    };
  }

  // Find by ID
  async findById(id) {
    return this.appointments.get(String(id)) || null;
  }

  // Update by ID
  async findByIdAndUpdate(id, updateData, options = {}) {
    const appointment = this.appointments.get(String(id));
    
    if (!appointment) {
      return null;
    }

    // Merge update data
    const updated = { ...appointment, ...updateData };
    
    // Validate if runValidators is true
    if (options.runValidators) {
      this.validate(updated);
    }

    // Ensure appointmentDate is a Date object
    if (updateData.appointmentDate) {
      updated.appointmentDate = new Date(updateData.appointmentDate);
    }

    this.appointments.set(String(id), updated);
    
    return options.new ? updated : appointment;
  }

  // Delete by ID (not used, but included for completeness)
  async findByIdAndDelete(id) {
    const appointment = this.appointments.get(String(id));
    if (appointment) {
      this.appointments.delete(String(id));
    }
    return appointment;
  }

  // Clear all appointments (for testing)
  clear() {
    this.appointments.clear();
    this.nextId = 1;
  }
}

module.exports = InMemoryAppointmentStore;
