/**
 * Filter patients by search term (name or MRN)
 * @param {Array} patients - Array of patient objects
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered patients
 */
export const filterBySearch = (patients, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return patients;
  }

  const term = searchTerm.toLowerCase().trim();
  
  return patients.filter(patient => {
    const name = patient.name.toLowerCase();
    const mrn = patient.mrn.toLowerCase();
    
    return name.includes(term) || mrn.includes(term);
  });
};

/**
 * Filter patients by date range
 * @param {Array} patients - Array of patient objects
 * @param {string} fromDate - Start date (ISO format)
 * @param {string} toDate - End date (ISO format)
 * @returns {Array} Filtered patients
 */
export const filterByDateRange = (patients, fromDate, toDate) => {
  if (!fromDate && !toDate) {
    return patients;
  }

  return patients.filter(patient => {
    const registrationDate = new Date(patient.registrationDate);
    
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return registrationDate >= from && registrationDate <= to;
    } else if (fromDate) {
      const from = new Date(fromDate);
      return registrationDate >= from;
    } else if (toDate) {
      const to = new Date(toDate);
      return registrationDate <= to;
    }
    
    return true;
  });
};

/**
 * Sort patients by a specific field
 * @param {Array} patients - Array of patient objects
 * @param {string} sortBy - Field to sort by (name, dateOfBirth, registrationDate)
 * @param {string} sortDirection - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted patients
 */
export const sortPatients = (patients, sortBy, sortDirection) => {
  if (!sortBy) {
    return patients;
  }

  const sorted = [...patients].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'dateOfBirth':
        aValue = new Date(a.dateOfBirth);
        bValue = new Date(b.dateOfBirth);
        break;
      case 'registrationDate':
        aValue = new Date(a.registrationDate);
        bValue = new Date(b.registrationDate);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sorted;
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
  return date.toLocaleDateString('en-US', options);
};
