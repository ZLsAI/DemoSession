import React from 'react';
import { PatientProvider } from './context/PatientContext';
import PatientList from './components/PatientList';

function App() {
  return (
    <PatientProvider>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f0f0f0'
      }}>
        <PatientList />
      </div>
    </PatientProvider>
  );
}

export default App;
