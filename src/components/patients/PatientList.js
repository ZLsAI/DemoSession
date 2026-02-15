import React, { useState, useEffect } from 'react';
import { patientAPI } from '../../services/api';
import PatientCard from './PatientCard';

function PatientList({ onSelectPatient, onAddNew }) {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    // Filter patients based on search term
    if (searchTerm.trim()) {
      const filtered = patients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const contact = patient.contactNumber || '';
        const search = searchTerm.toLowerCase();
        
        return fullName.includes(search) || contact.includes(search);
      });
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data || []);
      setFilteredPatients(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = () => {
    fetchPatients();
  };

  if (loading) {
    return (
      <div className="patient-list-container">
        <div className="loading-spinner">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-list-container">
        <div className="alert alert-error">
          {error}
          <button onClick={handleRefresh} className="btn-secondary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patient Records</h2>
        <div className="patient-list-actions">
          <button onClick={handleRefresh} className="btn-secondary" title="Refresh">
            ↻ Refresh
          </button>
          {onAddNew && (
            <button onClick={onAddNew} className="btn-primary">
              + Add New Patient
            </button>
          )}
        </div>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or contact number..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="search-clear"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      {filteredPatients.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? (
            <>
              <p>No patients found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="btn-secondary">
                Clear Search
              </button>
            </>
          ) : (
            <>
              <p>No patients registered yet</p>
              {onAddNew && (
                <button onClick={onAddNew} className="btn-primary">
                  Add Your First Patient
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="patient-count">
            Showing {filteredPatients.length} of {patients.length} patient{patients.length !== 1 ? 's' : ''}
          </div>
          
          <div className="patient-grid">
            {filteredPatients.map(patient => (
              <PatientCard
                key={patient._id}
                patient={patient}
                onClick={onSelectPatient}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PatientList;
