import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color = '#4CAF50' }) => {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-card-content">
        <div className="stat-card-header">
          {icon && <span className="stat-card-icon">{icon}</span>}
          <h3 className="stat-card-title">{title}</h3>
        </div>
        <p className="stat-card-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
