import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patientAPI } from '../../services/patientAPI';

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const res = await patientAPI.getById(id);
      setPatient(res.data);
    } catch (err) {
      setError('Failed to load patient details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientAPI.delete(id);
        navigate('/patients');
      } catch (err) {
        setError('Failed to delete patient');
      }
    }
  };

  if (loading) return <div className="loading">Loading patient details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!patient) return <div className="no-data">Patient not found</div>;

  return (
    <div className="patient-detail-container">
      <div className="detail-header">
        <div className="header-content">
          <div className="patient-avatar-large">
            {patient.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="header-info">
            <h2>{patient.name}</h2>
            <p className="patient-email">📧 {patient.email}</p>
            <p className="patient-phone">📞 {patient.phone}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => navigate(`/patients/edit/${id}`)}
            className="btn-primary"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Date of Birth:</span>
              <span className="info-value">{patient.dateOfBirth || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">{patient.gender || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Blood Type:</span>
              <span className="info-value">{patient.bloodType || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value">{patient.address || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Emergency Contact</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Contact Name:</span>
              <span className="info-value">{patient.emergencyContact || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contact Phone:</span>
              <span className="info-value">{patient.emergencyPhone || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Medical Information</h3>
          <div className="info-item">
            <span className="info-label">Allergies:</span>
            <span className="info-value">{patient.allergies || 'None reported'}</span>
          </div>
          <div className="info-item" style={{ marginTop: '1rem' }}>
            <span className="info-label">Medical History:</span>
            <span className="info-value">{patient.medicalHistory || 'No history recorded'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetail;
