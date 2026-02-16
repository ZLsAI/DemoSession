import React from 'react';
import './VisitHistoryItem.css';
import { formatDate } from '../utils/statsCalculator';

const VisitHistoryItem = ({ visit }) => {
  return (
    <div className="visit-history-item">
      <div className="visit-date">
        <span className="visit-date-badge">{formatDate(visit.date)}</span>
      </div>
      <div className="visit-details">
        <div className="visit-row">
          <strong>Reason:</strong>
          <span>{visit.reason}</span>
        </div>
        <div className="visit-row">
          <strong>Diagnosis:</strong>
          <span>{visit.diagnosis}</span>
        </div>
        <div className="visit-row">
          <strong>Treatment:</strong>
          <span>{visit.treatment}</span>
        </div>
        {visit.notes && (
          <div className="visit-row">
            <strong>Notes:</strong>
            <span>{visit.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitHistoryItem;
