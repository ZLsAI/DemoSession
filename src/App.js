import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { PatientProvider } from './contexts/PatientContext';
import Dashboard from './pages/Dashboard';
import PatientListPage from './pages/PatientListPage';
import PatientDetailPage from './pages/PatientDetailPage';
import PatientRegistrationForm from './pages/PatientRegistrationForm';
import './App.css';

function App() {
  return (
    <PatientProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-brand">
                🏥 Hospital Management
              </Link>
              <div className="nav-links">
                <NavLink 
                  to="/" 
                  end
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/patients"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Patients
                </NavLink>
                <NavLink 
                  to="/register"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Register
                </NavLink>
              </div>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientListPage />} />
              <Route path="/patients/:id" element={<PatientDetailPage />} />
              <Route path="/register" element={<PatientRegistrationForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PatientProvider>
  );
}

export default App;
