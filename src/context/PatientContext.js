import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { savePatients, loadPatients } from '../utils/storage';
import { getSampleData } from '../utils/sampleData';

/**
 * Patient Context for global state management
 */
const PatientContext = createContext();

/**
 * Action types for the patient reducer
 */
const ActionTypes = {
  SET_PATIENTS: 'SET_PATIENTS',
  ADD_PATIENT: 'ADD_PATIENT',
  UPDATE_PATIENT: 'UPDATE_PATIENT',
  DELETE_PATIENT: 'DELETE_PATIENT',
};

/**
 * Reducer function for patient state management
 * @param {Object} state - Current state
 * @param {Object} action - Action to perform
 * @returns {Object} - New state
 */
const patientReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_PATIENTS:
      return { patients: action.payload };
    
    case ActionTypes.ADD_PATIENT:
      return { patients: [...state.patients, action.payload] };
    
    case ActionTypes.UPDATE_PATIENT:
      return {
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? action.payload : patient
        ),
      };
    
    case ActionTypes.DELETE_PATIENT:
      return {
        patients: state.patients.filter(patient => patient.id !== action.payload),
      };
    
    default:
      return state;
  }
};

/**
 * PatientProvider component
 * Provides patient state and methods to all child components
 */
export const PatientProvider = ({ children }) => {
  // Initialize state with useReducer
  const [state, dispatch] = useReducer(patientReducer, { patients: [] });

  // Load patients from localStorage on mount
  useEffect(() => {
    const storedPatients = loadPatients();
    if (storedPatients && storedPatients.length > 0) {
      dispatch({ type: ActionTypes.SET_PATIENTS, payload: storedPatients });
    } else {
      // If no stored data, use sample data
      const sampleData = getSampleData();
      dispatch({ type: ActionTypes.SET_PATIENTS, payload: sampleData });
      savePatients(sampleData);
    }
  }, []);

  // Save patients to localStorage whenever state changes
  useEffect(() => {
    if (state.patients.length > 0) {
      savePatients(state.patients);
    }
  }, [state.patients]);

  /**
   * Add a new patient
   * @param {Object} patient - Patient object to add
   */
  const addPatient = (patient) => {
    dispatch({ type: ActionTypes.ADD_PATIENT, payload: patient });
  };

  /**
   * Update an existing patient
   * @param {Object} patient - Updated patient object
   */
  const updatePatient = (patient) => {
    dispatch({ type: ActionTypes.UPDATE_PATIENT, payload: patient });
  };

  /**
   * Delete a patient by ID
   * @param {string} patientId - ID of patient to delete
   */
  const deletePatient = (patientId) => {
    dispatch({ type: ActionTypes.DELETE_PATIENT, payload: patientId });
  };

  /**
   * Get a patient by ID
   * @param {string} patientId - ID of patient to retrieve
   * @returns {Object|undefined} - Patient object or undefined if not found
   */
  const getPatientById = (patientId) => {
    return state.patients.find(patient => patient.id === patientId);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      patients: state.patients,
      addPatient,
      updatePatient,
      deletePatient,
      getPatientById,
    }),
    [state.patients]
  );

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

/**
 * Custom hook to use the PatientContext
 * @returns {Object} - Patient context value
 */
export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

export default PatientContext;
