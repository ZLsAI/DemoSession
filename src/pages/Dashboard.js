import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../contexts/PatientContext';
import StatCard from '../components/StatCard';
import {
  getTotalPatients,
  getPatientsThisMonth,
  getPatientsThisWeek,
  getRecentPatients,
  formatDateShort
} from '../utils/statsCalculator';
import './Dashboard.css';

const Dashboard = () => {
  const { patients } = usePatients();

  // Memoize stats to avoid recalculating on every render
  const stats = useMemo(() => ({
    total: getTotalPatients(patients),
    thisMonth: getPatientsThisMonth(patients),
    thisWeek: getPatientsThisWeek(patients)
  }), [patients]);

  const recentPatients = useMemo(() => 
    getRecentPatients(patients, 5), 
    [patients]
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Hospital Dashboard</h1>
        <div className="dashboard-actions">
          <Link to="/register" className="btn btn-primary">
            Register New Patient
          </Link>
          <Link to="/patients" className="btn btn-secondary">
            View All Patients
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Patients"
          value={stats.total}
          icon="👥"
          color="#4CAF50"
        />
        <StatCard
          title="New This Month"
          value={stats.thisMonth}
          icon="📅"
          color="#2196F3"
        />
        <StatCard
          title="New This Week"
          value={stats.thisWeek}
          icon="⭐"
          color="#FF9800"
        />
      </div>

      <div className="recent-patients-section">
        <h2>Recently Registered Patients</h2>
        {recentPatients.length === 0 ? (
          <p className="no-data">No patients registered yet.</p>
        ) : (
          <div className="recent-patients-list">
            {recentPatients.map(patient => (
              <Link
                key={patient.id}
                to={`/patients/${patient.id}`}
                className="recent-patient-card"
              >
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p className="patient-mrn">MRN: {patient.mrn}</p>
                </div>
                <div className="patient-meta">
                  <span className="registration-date">
                    Registered: {formatDateShort(patient.registrationDate)}
                  </span>
                  <span className="view-link">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
