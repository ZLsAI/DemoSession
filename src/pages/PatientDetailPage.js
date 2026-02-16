import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePatients } from '../contexts/PatientContext';
import VisitHistoryItem from '../components/VisitHistoryItem';
import { formatDate } from '../utils/statsCalculator';
import './PatientDetailPage.css';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatientById } = usePatients();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const foundPatient = getPatientById(id);
      setPatient(foundPatient);
      setLoading(false);
    }, 300);
  }, [id, getPatientById]);

  if (loading) {
    return (
      <div className="patient-detail-page">
        <div className="loading">Loading patient information...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-detail-page">
        <div className="error">
          <h2>Patient Not Found</h2>
          <p>The patient with ID "{id}" could not be found.</p>
          <Link to="/patients" className="btn btn-primary">
            Back to Patient List
          </Link>
        </div>
      </div>
    );
  }

  // Sort visits by date (most recent first)
  const sortedVisits = [...(patient.visits || [])].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="patient-detail-page">
      <div className="page-header">
        <div>
          <h1>Patient Details</h1>
          <p className="page-subtitle">Complete patient information and visit history</p>
        </div>
        <div className="header-actions">
          <Link to="/register" className="btn btn-secondary">
            Edit Patient
          </Link>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            ← Back to List
          </button>
        </div>
      </div>

      <div className="patient-detail-layout">
        <div className="patient-info-card">
          <h2>Patient Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <span>{patient.name}</span>
            </div>
            <div className="info-item">
              <label>Medical Record Number</label>
              <span>{patient.mrn}</span>
            </div>
            <div className="info-item">
              <label>Date of Birth</label>
              <span>{formatDate(patient.dateOfBirth)}</span>
            </div>
            <div className="info-item">
              <label>Registration Date</label>
              <span>{formatDate(patient.registrationDate)}</span>
            </div>
            <div className="info-item">
              <label>Phone Number</label>
              <span>{patient.phone}</span>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <span>{patient.email}</span>
            </div>
          </div>
        </div>

        <div className="visit-history-section">
          <h2>Visit History</h2>
          {sortedVisits.length === 0 ? (
            <div className="no-visits">
              <p>No visits recorded for this patient.</p>
            </div>
          ) : (
            <div className="visit-history-list">
              {sortedVisits.map(visit => (
                <VisitHistoryItem key={visit.id} visit={visit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPage;
