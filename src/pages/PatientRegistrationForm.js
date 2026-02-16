import React from 'react';
import { Link } from 'react-router-dom';
import './PatientRegistrationForm.css';

const PatientRegistrationForm = () => {
  return (
    <div className="registration-page">
      <div className="page-header">
        <h1>Patient Registration</h1>
        <p className="page-subtitle">Register a new patient or edit existing information</p>
      </div>

      <div className="registration-card">
        <div className="coming-soon">
          <h2>🚧 Under Construction</h2>
          <p>The patient registration form is currently being developed.</p>
          <p>This feature will be available in a future update.</p>
          <Link to="/" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
