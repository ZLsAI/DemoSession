import React from 'react';
import { NavLink } from 'react-router-dom';

const navbarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '0 2rem',
  height: '64px',
  boxShadow: '0 2px 12px rgba(102, 126, 234, 0.4)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const brandStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const brandIconStyle = {
  fontSize: '1.5rem',
  color: '#fff',
  fontWeight: 'bold',
};

const brandTextStyle = {
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#fff',
  letterSpacing: '0.5px',
};

const navLinksStyle = {
  listStyle: 'none',
  display: 'flex',
  gap: '0.5rem',
  margin: 0,
  padding: 0,
};

const navLinkBase = {
  display: 'inline-block',
  padding: '0.45rem 1.2rem',
  borderRadius: '24px',
  color: 'rgba(255, 255, 255, 0.85)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
};

const navLinkActive = {
  ...navLinkBase,
  background: 'rgba(255, 255, 255, 0.25)',
  color: '#fff',
  fontWeight: 600,
};

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <div style={brandStyle}>
        <span style={brandIconStyle}>&#10003;</span>
        <span style={brandTextStyle}>TodoApp</span>
      </div>
      <ul style={navLinksStyle}>
        <li>
          <NavLink
            to="/"
            end
            style={({ isActive }) => isActive ? navLinkActive : navLinkBase}
          >
            To-Do List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/counter"
            style={({ isActive }) => isActive ? navLinkActive : navLinkBase}
          >
            Counter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
