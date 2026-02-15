/**
 * Check if a staff member is available on a given date/time
 * @param {Object} staff - Staff object with availability field
 * @param {Date} date - Date to check (defaults to current date)
 * @returns {Boolean} - True if staff is available, false otherwise
 */
function isStaffAvailable(staff, date = new Date()) {
  if (!staff || !staff.availability) {
    return false;
  }

  // Get day name in lowercase (e.g., 'monday', 'tuesday')
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayIndex = date.getDay();
  const dayName = dayNames[dayIndex];
  
  return staff.availability[dayName]?.available || false;
}

/**
 * Validate role against allowed values
 * @param {String} role - Role to validate
 * @returns {Boolean} - True if valid role
 */
function isValidRole(role) {
  const validRoles = ['Doctor', 'Nurse', 'Administrator', 'Technician', 'Receptionist', 'Other'];
  return validRoles.includes(role);
}

/**
 * Validate department against allowed values
 * @param {String} department - Department to validate
 * @returns {Boolean} - True if valid department
 */
function isValidDepartment(department) {
  const validDepartments = ['Emergency', 'Cardiology', 'Pediatrics', 'Surgery', 'Radiology', 'Administration', 'Other'];
  return validDepartments.includes(department);
}

/**
 * Validate employment status against allowed values
 * @param {String} status - Status to validate
 * @returns {Boolean} - True if valid status
 */
function isValidEmploymentStatus(status) {
  const validStatuses = ['active', 'inactive', 'on-leave'];
  return validStatuses.includes(status);
}

module.exports = {
  isStaffAvailable,
  isValidRole,
  isValidDepartment,
  isValidEmploymentStatus
};
