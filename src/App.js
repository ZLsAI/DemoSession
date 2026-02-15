import React, { useState } from 'react';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import PatientDetail from './components/patients/PatientDetail';
import './styles/patients.css';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'detail'
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('detail');
  };

  const handleAddNew = () => {
    setSelectedPatient(null);
    setCurrentView('form');
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('form');
  };

  const handleFormSuccess = () => {
    setCurrentView('list');
    setSelectedPatient(null);
  };

  const handleFormCancel = () => {
    setCurrentView('list');
    setSelectedPatient(null);
  };

  const handleDetailClose = () => {
    setCurrentView('list');
    setSelectedPatient(null);
  };

  const handlePatientDeleted = () => {
    setCurrentView('list');
    setSelectedPatient(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      padding: '20px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <header style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px 30px',
          marginBottom: '0'
        }}>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Patient Records Management</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Comprehensive Healthcare System</p>
        </header>

        <nav style={{
          padding: '15px 30px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={() => {
              setCurrentView('list');
              setSelectedPatient(null);
            }}
            style={{
              padding: '8px 16px',
              background: currentView === 'list' ? '#007bff' : '#f0f0f0',
              color: currentView === 'list' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Patient List
          </button>
          <button
            onClick={handleAddNew}
            style={{
              padding: '8px 16px',
              background: currentView === 'form' && !selectedPatient ? '#007bff' : '#f0f0f0',
              color: currentView === 'form' && !selectedPatient ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Add Patient
          </button>
        </nav>

        <main>
          {currentView === 'list' && (
            <PatientList
              onSelectPatient={handleSelectPatient}
              onAddNew={handleAddNew}
            />
          )}

          {currentView === 'form' && (
            <PatientForm
              patient={selectedPatient}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}

          {currentView === 'detail' && selectedPatient && (
            <PatientDetail
              patientId={selectedPatient._id}
              onEdit={handleEdit}
              onClose={handleDetailClose}
              onDeleted={handlePatientDeleted}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
