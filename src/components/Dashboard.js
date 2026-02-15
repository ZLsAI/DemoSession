import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Hospital Management System</h1>
        <p>Welcome to the hospital management dashboard</p>
      </div>
      
      <div className="dashboard-grid">
        <Link to="/patients" className="dashboard-card patients">
          <div className="card-icon">👥</div>
          <h2>Patients</h2>
          <p>Manage patient records and information</p>
        </Link>
        
        <Link to="/appointments" className="dashboard-card appointments">
          <div className="card-icon">📅</div>
          <h2>Appointments</h2>
          <p>Schedule and manage appointments</p>
        </Link>
        
        <Link to="/staff" className="dashboard-card staff">
          <div className="card-icon">⚕️</div>
          <h2>Staff</h2>
          <p>View and manage hospital staff</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
