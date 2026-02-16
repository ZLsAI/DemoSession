import React from 'react';
import { PatientProvider } from './contexts/PatientContext';
import PatientRegistrationForm from './components/PatientRegistrationForm';

function App() {
  return (
    <PatientProvider>
      <div style={{ 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0'
      }}>
        <PatientRegistrationForm />
      </div>
    </PatientProvider>
  );
}

export default App;
