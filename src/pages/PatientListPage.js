import React from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../contexts/PatientContext';
import { formatDateShort } from '../utils/statsCalculator';
import './PatientListPage.css';

const PatientListPage = () => {
  const { patients } = usePatients();

  return (
    <div className="patient-list-page">
      <div className="page-header">
        <div>
          <h1>Patient List</h1>
          <p className="page-subtitle">View all registered patients</p>
        </div>
        <Link to="/register" className="btn btn-primary">
          + Register New Patient
        </Link>
      </div>

      {patients.length === 0 ? (
        <div className="no-patients">
          <p>No patients registered yet.</p>
          <Link to="/register" className="btn btn-primary">
            Register First Patient
          </Link>
        </div>
      ) : (
        <div className="patients-table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>MRN</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Phone</th>
                <th>Registration Date</th>
                <th>Visits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td className="mrn-cell">{patient.mrn}</td>
                  <td className="name-cell">{patient.name}</td>
                  <td>{formatDateShort(patient.dateOfBirth)}</td>
                  <td>{patient.phone}</td>
                  <td>{formatDateShort(patient.registrationDate)}</td>
                  <td className="visits-cell">
                    {patient.visits?.length || 0}
                  </td>
                  <td>
                    <Link 
                      to={`/patients/${patient.id}`} 
                      className="btn-link"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientListPage;
