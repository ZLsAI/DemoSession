/**
 * Date and time utility functions for appointment scheduling
 */

/**
 * Parse appointment date and time into a JavaScript Date object
 * @param {Date|string} appointmentDate - The date of the appointment
 * @param {string} appointmentTime - Time in HH:MM format
 * @returns {Date} Combined date and time as Date object
 */
function parseDateTime(appointmentDate, appointmentTime) {
  const date = new Date(appointmentDate);
  const [hours, minutes] = appointmentTime.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Check if a new appointment conflicts with existing appointments
 * @param {Array} existingAppointments - Array of existing appointments
 * @param {Object} newAppointment - New appointment to check
 * @param {string} excludeId - Optional appointment ID to exclude (for updates)
 * @returns {boolean} True if there's a conflict, false otherwise
 */
function checkAppointmentConflict(existingAppointments, newAppointment, excludeId = null) {
  // Calculate new appointment time window
  const newStart = parseDateTime(newAppointment.appointmentDate, newAppointment.appointmentTime);
  const newEnd = new Date(newStart.getTime() + (newAppointment.duration || 30) * 60000);
  
  // Check each existing appointment for conflicts
  return existingAppointments.some(appt => {
    // Skip if it's the same appointment (for updates)
    if (excludeId && appt._id && appt._id.toString() === excludeId.toString()) {
      return false;
    }
    
    // Skip if different doctor or cancelled appointment
    if (appt.doctorName !== newAppointment.doctorName || appt.status === 'cancelled') {
      return false;
    }
    
    // Calculate existing appointment time window
    const existingStart = parseDateTime(appt.appointmentDate, appt.appointmentTime);
    const existingEnd = new Date(existingStart.getTime() + (appt.duration || 30) * 60000);
    
    // Check for overlap: new appointment starts before existing ends AND new ends after existing starts
    return (newStart < existingEnd && newEnd > existingStart);
  });
}

/**
 * Validate that appointment is in the future
 * @param {Date|string} appointmentDate - The date of the appointment
 * @param {string} appointmentTime - Time in HH:MM format
 * @param {string} status - Appointment status
 * @returns {boolean} True if valid, false otherwise
 */
function validateFutureDateTime(appointmentDate, appointmentTime, status = 'scheduled') {
  // Allow past dates for completed, cancelled, or no-show statuses
  if (['completed', 'cancelled', 'no-show'].includes(status)) {
    return true;
  }
  
  const appointmentDateTime = parseDateTime(appointmentDate, appointmentTime);
  const now = new Date();
  
  return appointmentDateTime > now;
}

/**
 * Format date to YYYY-MM-DD string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse date range query parameters
 * @param {string} startDate - Start date string (YYYY-MM-DD)
 * @param {string} endDate - End date string (YYYY-MM-DD)
 * @returns {Object} Date range query object or null
 */
function parseDateRange(startDate, endDate) {
  if (!startDate && !endDate) {
    return null;
  }
  
  const query = {};
  
  if (startDate) {
    query.$gte = new Date(startDate);
  }
  
  if (endDate) {
    // Set to end of day for inclusive range
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    query.$lte = end;
  }
  
  return query;
}

module.exports = {
  parseDateTime,
  checkAppointmentConflict,
  validateFutureDateTime,
  formatDateString,
  parseDateRange
};
