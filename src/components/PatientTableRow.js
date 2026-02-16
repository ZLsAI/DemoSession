import React from 'react';
import { formatDate } from '../utils/filterUtils';

const PatientTableRow = ({ patient, onViewDetails, onEdit }) => {
  return (
    <tr className="patient-row">
      <td>{patient.name}</td>
      <td>{patient.mrn}</td>
      <td>{formatDate(patient.dateOfBirth)}</td>
      <td>{patient.phone}</td>
      <td>{patient.email}</td>
      <td>{formatDate(patient.registrationDate)}</td>
      <td className="actions-cell">
        <button 
          className="action-btn view-btn"
          onClick={() => onViewDetails(patient.id)}
          aria-label={`View details for ${patient.name}`}
        >
          View Details
        </button>
        <button 
          className="action-btn edit-btn"
          onClick={() => onEdit(patient.id)}
          aria-label={`Edit ${patient.name}`}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default PatientTableRow;
