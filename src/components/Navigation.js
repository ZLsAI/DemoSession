import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-header">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">Hospital Management System</span>
          </Link>
          <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/patients" className={`nav-link ${isActive('/patients')}`} onClick={() => setIsMenuOpen(false)}>
              Patients
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/appointments" className={`nav-link ${isActive('/appointments')}`} onClick={() => setIsMenuOpen(false)}>
              Appointments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/staff" className={`nav-link ${isActive('/staff')}`} onClick={() => setIsMenuOpen(false)}>
              Staff
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
