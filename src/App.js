import React from 'react';
import { PatientProvider } from './context/PatientContext';

function App() {
  return (
    <PatientProvider>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Hospital Management System</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Patient data management is now active!</p>
      </div>
    </PatientProvider>
  );
}

export default App;
