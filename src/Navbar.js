import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTodos } from './TodoContext';

const styles = {
  nav: {
    backgroundColor: '#1a1a2e',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  brand: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    marginRight: '32px',
    textDecoration: 'none',
    fontFamily: 'Arial, sans-serif',
  },
  links: {
    display: 'flex',
    gap: '4px',
    flex: 1,
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '15px',
    fontFamily: 'Arial, sans-serif',
    transition: 'background 0.2s',
  },
  activeLink: {
    color: '#fff',
    backgroundColor: '#4361ee',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#ef233c',
    color: '#fff',
    borderRadius: '10px',
    padding: '1px 7px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '6px',
    verticalAlign: 'middle',
  },
};

function Navbar() {
  const location = useLocation();
  const { todos } = useTodos();

  function linkStyle(path) {
    return location.pathname === path ? styles.activeLink : styles.link;
  }

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>MyApp</span>
      <div style={styles.links}>
        <Link to="/" style={linkStyle('/')}>
          To-Do List
        </Link>
        <Link to="/counter" style={linkStyle('/counter')}>
          Counter
          {todos.length > 0 && <span style={styles.badge}>{todos.length}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
