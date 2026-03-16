import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTodos } from '../TodoContext';

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  brand: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    padding: '16px 0',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '8px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '10px',
    padding: '1px 7px',
    fontSize: '12px',
    marginLeft: '6px',
    fontWeight: 'bold',
  },
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? '#4CAF50' : '#ccc',
  textDecoration: 'none',
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  padding: '16px 14px',
  display: 'inline-block',
  borderBottom: isActive ? '3px solid #4CAF50' : '3px solid transparent',
  transition: 'color 0.2s, border-bottom 0.2s',
});

function NavBar() {
  const { todos } = useTodos();

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>React App</span>
      <div style={styles.links}>
        <NavLink to="/" style={linkStyle} end>
          To-Do List
        </NavLink>
        <NavLink to="/counter" style={linkStyle}>
          Counter
          {todos.length > 0 && (
            <span style={styles.badge}>{todos.length}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
