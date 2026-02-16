import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext();

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

export const PatientProvider = ({ children }) => {
  // Mock patient data - in a real app, this would come from an API
  const [patients] = useState([
    {
      id: 1,
      name: 'John Smith',
      mrn: 'MRN001234',
      dateOfBirth: '1985-03-15',
      phone: '555-0101',
      email: 'john.smith@email.com',
      registrationDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      mrn: 'MRN001235',
      dateOfBirth: '1990-07-22',
      phone: '555-0102',
      email: 'sarah.j@email.com',
      registrationDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Michael Brown',
      mrn: 'MRN001236',
      dateOfBirth: '1978-11-08',
      phone: '555-0103',
      email: 'mbrown@email.com',
      registrationDate: '2024-03-10'
    },
    {
      id: 4,
      name: 'Emily Davis',
      mrn: 'MRN001237',
      dateOfBirth: '1995-05-30',
      phone: '555-0104',
      email: 'emily.davis@email.com',
      registrationDate: '2024-04-05'
    },
    {
      id: 5,
      name: 'David Wilson',
      mrn: 'MRN001238',
      dateOfBirth: '1982-09-12',
      phone: '555-0105',
      email: 'dwilson@email.com',
      registrationDate: '2024-05-18'
    },
    {
      id: 6,
      name: 'Jennifer Martinez',
      mrn: 'MRN001239',
      dateOfBirth: '1988-12-25',
      phone: '555-0106',
      email: 'jmartinez@email.com',
      registrationDate: '2024-06-22'
    },
    {
      id: 7,
      name: 'Robert Taylor',
      mrn: 'MRN001240',
      dateOfBirth: '1975-02-14',
      phone: '555-0107',
      email: 'rtaylor@email.com',
      registrationDate: '2024-07-30'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      mrn: 'MRN001241',
      dateOfBirth: '1992-08-19',
      phone: '555-0108',
      email: 'lisa.anderson@email.com',
      registrationDate: '2024-08-15'
    },
    {
      id: 9,
      name: 'James Thomas',
      mrn: 'MRN001242',
      dateOfBirth: '1980-04-27',
      phone: '555-0109',
      email: 'jthomas@email.com',
      registrationDate: '2024-09-08'
    },
    {
      id: 10,
      name: 'Mary Jackson',
      mrn: 'MRN001243',
      dateOfBirth: '1987-10-03',
      phone: '555-0110',
      email: 'mary.jackson@email.com',
      registrationDate: '2024-10-12'
    }
  ]);

  const getPatientById = (id) => {
    return patients.find(patient => patient.id === parseInt(id));
  };

  const value = {
    patients,
    getPatientById
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
