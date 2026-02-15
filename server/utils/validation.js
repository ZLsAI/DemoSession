/**
 * Email validation helper
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
  if (!email) return true; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Date of birth validation - must be in the past
 * @param {Date|string} dateOfBirth - Date to validate
 * @returns {boolean} - True if date is in the past
 */
function isValidDateOfBirth(dateOfBirth) {
  const date = new Date(dateOfBirth);
  if (isNaN(date.getTime())) return false;
  return date < new Date();
}

/**
 * Validate required fields are present and not empty
 * @param {object} data - Object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {object} - { valid: boolean, missing: string[] }
 */
function validateRequiredFields(data, requiredFields) {
  const missing = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missing.push(field);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Validate patient data
 * @param {object} patientData - Patient data to validate
 * @returns {object} - { valid: boolean, errors: string[] }
 */
function validatePatientData(patientData) {
  const errors = [];
  
  // Check required fields
  const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'contactNumber'];
  const requiredValidation = validateRequiredFields(patientData, requiredFields);
  
  if (!requiredValidation.valid) {
    errors.push(`Missing required fields: ${requiredValidation.missing.join(', ')}`);
  }
  
  // Validate email if provided
  if (patientData.email && !isValidEmail(patientData.email)) {
    errors.push('Invalid email format');
  }
  
  // Validate date of birth
  if (patientData.dateOfBirth && !isValidDateOfBirth(patientData.dateOfBirth)) {
    errors.push('Date of birth must be a valid date in the past');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  isValidEmail,
  isValidDateOfBirth,
  validateRequiredFields,
  validatePatientData
};
