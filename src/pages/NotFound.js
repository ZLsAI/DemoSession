import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      flexDirection: 'column',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{ 
        color: '#333', 
        fontSize: '120px', 
        marginBottom: '10px',
        marginTop: '0' 
      }}>
        404
      </h1>
      <h2 style={{ 
        color: '#333', 
        fontSize: '32px',
        marginBottom: '20px',
        marginTop: '0'
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        color: '#666', 
        fontSize: '18px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/" 
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
