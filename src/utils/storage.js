/**
 * localStorage utilities for patient data persistence
 * Provides functions to save, load, and clear patient data from browser storage
 */

const STORAGE_KEY = 'hospital-patients';

/**
 * Save patients to localStorage
 * @param {Array} patients - Array of patient objects to save
 * @returns {boolean} - Success status
 */
export const savePatients = (patients) => {
  try {
    const jsonData = JSON.stringify(patients);
    localStorage.setItem(STORAGE_KEY, jsonData);
    return true;
  } catch (error) {
    console.error('Error saving patients to localStorage:', error);
    // Handle private browsing or quota exceeded errors
    return false;
  }
};

/**
 * Load patients from localStorage
 * @returns {Array|null} - Array of patient objects or null if not found/error
 */
export const loadPatients = () => {
  try {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (jsonData) {
      return JSON.parse(jsonData);
    }
    return null;
  } catch (error) {
    console.error('Error loading patients from localStorage:', error);
    return null;
  }
};

/**
 * Clear all patients from localStorage
 * @returns {boolean} - Success status
 */
export const clearPatients = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing patients from localStorage:', error);
    return false;
  }
};
