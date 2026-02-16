import React, { createContext, useContext, useState } from 'react';

// Create the context
const PatientContext = createContext();

/**
 * Custom hook to use the PatientContext
 * @returns {Object} - Context value with patients array and methods
 */
export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

/**
 * PatientProvider component to wrap the app and provide patient state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  /**
   * Adds a new patient to the list
   * @param {Object} patient - Patient data object
   * @param {string} patient.fullName - Patient's full name
   * @param {string} patient.dateOfBirth - Patient's date of birth (ISO format)
   * @param {string} patient.phoneNumber - Patient's phone number
   * @param {string} patient.email - Patient's email address
   * @param {string} patient.medicalRecordNumber - Patient's MRN
   * @returns {Object} - Result object with success flag and message
   */
  const addPatient = (patient) => {
    // Check for duplicate MRN
    const duplicate = patients.find(
      (p) => p.medicalRecordNumber === patient.medicalRecordNumber
    );

    if (duplicate) {
      return {
        success: false,
        message: 'A patient with this Medical Record Number already exists',
      };
    }

    // Create patient object with ID and timestamp
    const newPatient = {
      id: Date.now().toString(),
      ...patient,
      registeredAt: new Date().toISOString(),
    };

    setPatients((prevPatients) => [...prevPatients, newPatient]);

    return {
      success: true,
      message: 'Patient registered successfully',
      patient: newPatient,
    };
  };

  /**
   * Gets a patient by their Medical Record Number
   * @param {string} mrn - Medical Record Number
   * @returns {Object|undefined} - Patient object or undefined if not found
   */
  const getPatientByMRN = (mrn) => {
    return patients.find((p) => p.medicalRecordNumber === mrn);
  };

  /**
   * Gets all patients
   * @returns {Array} - Array of all patients
   */
  const getAllPatients = () => {
    return [...patients];
  };

  /**
   * Removes a patient by ID
   * @param {string} id - Patient ID
   * @returns {boolean} - True if patient was removed, false otherwise
   */
  const removePatient = (id) => {
    const initialLength = patients.length;
    setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id));
    return patients.length < initialLength;
  };

  const value = {
    patients,
    addPatient,
    getPatientByMRN,
    getAllPatients,
    removePatient,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
