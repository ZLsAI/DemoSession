// Validation utilities for patient registration form

/**
 * Validates that a name is not empty and contains only letters, spaces, hyphens, and apostrophes
 * @param {string} name - The name to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.trim().length > 100) {
    return 'Name must not exceed 100 characters';
  }
  if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return null;
};

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  // Email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validates phone number format
 * Accepts formats like (555) 123-4567 or 555-123-4567 or 5551234567
 * @param {string} phone - The phone number to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return 'Phone number is required';
  }
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length !== 10) {
    return 'Phone number must be exactly 10 digits';
  }
  return null;
};

/**
 * Validates Medical Record Number (MRN)
 * Must be alphanumeric and between 4-20 characters
 * @param {string} mrn - The MRN to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateMRN = (mrn) => {
  if (!mrn || mrn.trim().length === 0) {
    return 'Medical Record Number is required';
  }
  if (!/^[a-zA-Z0-9]+$/.test(mrn.trim())) {
    return 'MRN must be alphanumeric (letters and numbers only)';
  }
  if (mrn.trim().length < 4) {
    return 'MRN must be at least 4 characters';
  }
  if (mrn.trim().length > 20) {
    return 'MRN must not exceed 20 characters';
  }
  return null;
};

/**
 * Validates date of birth
 * Must be a valid date and not in the future
 * @param {string} dateOfBirth - The date to validate (in YYYY-MM-DD format)
 * @returns {string|null} - Error message or null if valid
 */
export const validateDateOfBirth = (dateOfBirth) => {
  if (!dateOfBirth || dateOfBirth.trim().length === 0) {
    return 'Date of birth is required';
  }
  
  const date = new Date(dateOfBirth);
  
  // Check if valid date
  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }
  
  // Check if date is not in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) {
    return 'Date of birth cannot be in the future';
  }
  
  // Check if date is not too old (more than 150 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 150);
  if (date < minDate) {
    return 'Please enter a valid date of birth';
  }
  
  return null;
};

/**
 * Normalizes phone number to a consistent format
 * @param {string} phone - The phone number to normalize
 * @returns {string} - Normalized phone number in format (XXX) XXX-XXXX
 */
export const normalizePhone = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  return phone;
};

/**
 * Generates a unique Medical Record Number based on timestamp
 * @returns {string} - Generated MRN
 */
export const generateMRN = () => {
  return `MRN${Date.now()}`;
};
