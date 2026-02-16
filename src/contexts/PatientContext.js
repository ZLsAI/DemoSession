import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext();

// Sample patient data with visit history
const initialPatients = [
  {
    id: '1',
    name: 'John Smith',
    dateOfBirth: '1985-06-15',
    phone: '555-0101',
    email: 'john.smith@email.com',
    mrn: 'MRN001',
    registrationDate: '2024-01-15',
    visits: [
      {
        id: 'v1',
        date: '2024-02-10',
        reason: 'Annual checkup',
        diagnosis: 'Healthy',
        treatment: 'Continue current lifestyle',
        notes: 'Blood pressure normal. Cholesterol within range.'
      },
      {
        id: 'v2',
        date: '2023-11-20',
        reason: 'Flu symptoms',
        diagnosis: 'Influenza Type A',
        treatment: 'Prescribed antiviral medication',
        notes: 'Rest recommended for 5-7 days'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    dateOfBirth: '1990-03-22',
    phone: '555-0102',
    email: 'sarah.j@email.com',
    mrn: 'MRN002',
    registrationDate: '2024-02-01',
    visits: [
      {
        id: 'v3',
        date: '2024-02-15',
        reason: 'Follow-up consultation',
        diagnosis: 'Recovery on track',
        treatment: 'Continue medication',
        notes: 'Patient responding well to treatment'
      }
    ]
  },
  {
    id: '3',
    name: 'Michael Chen',
    dateOfBirth: '1978-11-08',
    phone: '555-0103',
    email: 'michael.chen@email.com',
    mrn: 'MRN003',
    registrationDate: '2023-12-10',
    visits: []
  },
  {
    id: '4',
    name: 'Emily Davis',
    dateOfBirth: '1995-09-30',
    phone: '555-0104',
    email: 'emily.d@email.com',
    mrn: 'MRN004',
    registrationDate: '2024-02-10',
    visits: [
      {
        id: 'v4',
        date: '2024-02-12',
        reason: 'Initial consultation',
        diagnosis: 'Minor allergies',
        treatment: 'Antihistamine prescription',
        notes: 'Advised to avoid known allergens'
      }
    ]
  },
  {
    id: '5',
    name: 'Robert Wilson',
    dateOfBirth: '1982-07-14',
    phone: '555-0105',
    email: 'robert.w@email.com',
    mrn: 'MRN005',
    registrationDate: '2024-02-08',
    visits: []
  },
  {
    id: '6',
    name: 'Jennifer Martinez',
    dateOfBirth: '1988-04-25',
    phone: '555-0106',
    email: 'jennifer.m@email.com',
    mrn: 'MRN006',
    registrationDate: '2024-02-05',
    visits: [
      {
        id: 'v5',
        date: '2024-02-14',
        reason: 'Routine checkup',
        diagnosis: 'Good health',
        treatment: 'No treatment needed',
        notes: 'Annual physical complete. All tests normal.'
      }
    ]
  }
];

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(initialPatients);

  const getPatientById = (id) => {
    return patients.find(patient => patient.id === id);
  };

  const addPatient = (patient) => {
    const newPatient = {
      ...patient,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString().split('T')[0],
      visits: []
    };
    setPatients([...patients, newPatient]);
    return newPatient;
  };

  const updatePatient = (id, updatedData) => {
    setPatients(patients.map(patient => 
      patient.id === id ? { ...patient, ...updatedData } : patient
    ));
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const addVisit = (patientId, visit) => {
    const patient = getPatientById(patientId);
    if (patient) {
      const newVisit = {
        ...visit,
        id: `v${Date.now()}`,
        date: new Date().toISOString().split('T')[0]
      };
      updatePatient(patientId, {
        visits: [...(patient.visits || []), newVisit]
      });
      return newVisit;
    }
    return null;
  };

  const value = {
    patients,
    getPatientById,
    addPatient,
    updatePatient,
    deletePatient,
    addVisit
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

export default PatientContext;
