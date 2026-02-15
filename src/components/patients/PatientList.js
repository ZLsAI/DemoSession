import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { patientAPI } from '../../services/patientAPI';
import '../../styles/patients.css';

function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = patients.filter(patient =>
        patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone?.includes(searchQuery)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchQuery, patients]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const res = await patientAPI.getAll();
      setPatients(res.data);
      setFilteredPatients(res.data);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientAPI.delete(id);
        loadPatients();
      } catch (err) {
        setError('Failed to delete patient');
      }
    }
  };

  if (loading) return <div className="loading">Loading patients...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="patient-list-container">
      <div className="list-header">
        <h2>Patients</h2>
        <Link to="/patients/new" className="btn-primary">
          Add Patient
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search patients by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="patient-count">
        Showing {filteredPatients.length} of {patients.length} patients
      </div>

      {filteredPatients.length === 0 ? (
        <div className="no-data">No patients found</div>
      ) : (
        <div className="patients-grid">
          {filteredPatients.map(patient => (
            <div key={patient.id} className="patient-card">
              <div className="patient-avatar">
                {patient.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="patient-info">
                <h3>{patient.name}</h3>
                <p className="patient-email">📧 {patient.email}</p>
                <p className="patient-phone">📞 {patient.phone}</p>
                {patient.dateOfBirth && (
                  <p className="patient-dob">🎂 {patient.dateOfBirth}</p>
                )}
                {patient.bloodType && (
                  <p className="patient-blood">🩸 {patient.bloodType}</p>
                )}
              </div>
              <div className="patient-actions">
                <button
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="btn-small btn-view"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`/patients/edit/${patient.id}`)}
                  className="btn-small btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="btn-small btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientList;
