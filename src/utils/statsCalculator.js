/**
 * Calculate dashboard statistics from patient data
 */

/**
 * Get total count of patients
 */
export const getTotalPatients = (patients) => {
  return patients.length;
};

/**
 * Get count of patients registered this month
 */
export const getPatientsThisMonth = (patients) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return patients.filter(patient => {
    const registrationDate = new Date(patient.registrationDate);
    return registrationDate.getMonth() === currentMonth && 
           registrationDate.getFullYear() === currentYear;
  }).length;
};

/**
 * Get count of patients registered this week
 */
export const getPatientsThisWeek = (patients) => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return patients.filter(patient => {
    const registrationDate = new Date(patient.registrationDate);
    return registrationDate >= oneWeekAgo && registrationDate <= now;
  }).length;
};

/**
 * Get most recently registered patients
 * @param {Array} patients - Array of patient objects
 * @param {number} limit - Maximum number of patients to return
 */
export const getRecentPatients = (patients, limit = 5) => {
  return [...patients]
    .sort((a, b) => {
      const dateA = new Date(a.registrationDate);
      const dateB = new Date(b.registrationDate);
      return dateB - dateA; // Most recent first
    })
    .slice(0, limit);
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date to short format
 */
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
