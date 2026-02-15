import React, { useState, useEffect } from 'react';
import { patientAPI } from '../../services/api';

function PatientDetail({ patientId, onEdit, onClose, onDeleted }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchPatient = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await patientAPI.getById(patientId);
      setPatient(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load patient details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    
    try {
      await patientAPI.delete(patientId);
      if (onDeleted) {
        onDeleted();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete patient');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading-spinner">Loading patient details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-detail-container">
        <div className="alert alert-error">{error}</div>
        <button onClick={onClose} className="btn-secondary">
          Back to List
        </button>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-detail-container">
        <div className="alert alert-error">Patient not found</div>
        <button onClick={onClose} className="btn-secondary">
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <div>
          <h2>{patient.firstName} {patient.lastName}</h2>
          <p className="patient-subtitle">
            {calculateAge(patient.dateOfBirth)} years old • {patient.gender || 'Not specified'}
          </p>
        </div>
        <div className="detail-actions">
          <button onClick={() => onEdit(patient)} className="btn-primary">
            Edit
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="btn-danger"
            disabled={deleting}
          >
            Delete
          </button>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
      
      <div className="patient-detail-body">
        <section className="detail-section">
          <h3>Personal Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Date of Birth</label>
              <p>{formatDate(patient.dateOfBirth)}</p>
            </div>
            
            <div className="detail-item">
              <label>Gender</label>
              <p>{patient.gender || 'Not specified'}</p>
            </div>
            
            <div className="detail-item">
              <label>Blood Type</label>
              <p>{patient.bloodType || 'Not specified'}</p>
            </div>
          </div>
        </section>
        
        <section className="detail-section">
          <h3>Contact Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Phone Number</label>
              <p>{patient.contactNumber || 'Not provided'}</p>
            </div>
            
            <div className="detail-item">
              <label>Email</label>
              <p>{patient.email || 'Not provided'}</p>
            </div>
            
            <div className="detail-item">
              <label>Emergency Contact</label>
              <p>{patient.emergencyContact || 'Not provided'}</p>
            </div>
          </div>
          
          {patient.address && (
            <div className="detail-item full-width">
              <label>Address</label>
              <p>{patient.address}</p>
            </div>
          )}
        </section>
        
        {patient.allergies && patient.allergies.length > 0 && (
          <section className="detail-section">
            <h3>Allergies</h3>
            <div className="allergies-list">
              {patient.allergies.map((allergy, index) => (
                <span key={index} className="allergy-tag-detail">
                  {allergy}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {patient.medicalHistory && (
          <section className="detail-section">
            <h3>Medical History</h3>
            <div className="medical-history">
              <p>{patient.medicalHistory}</p>
            </div>
          </section>
        )}
      </div>
      
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <strong>{patient.firstName} {patient.lastName}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={handleDelete}
                className="btn-danger"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-secondary"
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDetail;
