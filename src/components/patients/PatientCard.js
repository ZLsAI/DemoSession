import React from 'react';

function PatientCard({ patient, onClick }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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

  return (
    <div className="patient-card" onClick={() => onClick(patient)}>
      <div className="patient-card-header">
        <h3 className="patient-name">
          {patient.firstName} {patient.lastName}
        </h3>
        <span className="patient-age">{calculateAge(patient.dateOfBirth)} years</span>
      </div>
      
      <div className="patient-card-body">
        <div className="patient-info-row">
          <span className="info-label">DOB:</span>
          <span className="info-value">{formatDate(patient.dateOfBirth)}</span>
        </div>
        
        <div className="patient-info-row">
          <span className="info-label">Gender:</span>
          <span className="info-value">{patient.gender || 'N/A'}</span>
        </div>
        
        <div className="patient-info-row">
          <span className="info-label">Contact:</span>
          <span className="info-value">{patient.contactNumber || 'N/A'}</span>
        </div>
        
        <div className="patient-info-row">
          <span className="info-label">Blood Type:</span>
          <span className="info-value">{patient.bloodType || 'N/A'}</span>
        </div>
        
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="patient-info-row">
            <span className="info-label">Allergies:</span>
            <span className="info-value allergies-badge">
              {patient.allergies.length} allerg{patient.allergies.length === 1 ? 'y' : 'ies'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientCard;
