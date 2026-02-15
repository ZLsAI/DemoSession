const validator = require('validator');

/**
 * Sanitize input to prevent injection attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(input) {
  if (!input || typeof input !== 'string') {
    return input;
  }
  
  // Trim whitespace
  let sanitized = input.trim();
  
  // Escape HTML to prevent XSS
  sanitized = validator.escape(sanitized);
  
  return sanitized;
}

/**
 * Sanitize query parameters
 * @param {Object} query - Query object to sanitize
 * @returns {Object} Sanitized query object
 */
function sanitizeQuery(query) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Sanitize appointment data
 * @param {Object} data - Appointment data to sanitize
 * @returns {Object} Sanitized appointment data
 */
function sanitizeAppointmentData(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  const sanitized = { ...data };
  
  // Sanitize string fields
  const stringFields = ['patientId', 'patientName', 'doctorName', 'reason', 'notes', 'status'];
  
  for (const field of stringFields) {
    if (sanitized[field]) {
      sanitized[field] = sanitizeString(sanitized[field]);
    }
  }
  
  return sanitized;
}

module.exports = {
  sanitizeString,
  sanitizeQuery,
  sanitizeAppointmentData
};
