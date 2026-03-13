import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const theme = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      flexDirection: 'column',
      backgroundColor: darkMode ? '#1a1a2e' : '#f0f0f0',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    heading: {
      color: darkMode ? '#e0e0e0' : '#333',
      marginBottom: '20px',
      transition: 'color 0.3s ease',
    },
    paragraph: {
      color: darkMode ? '#aaaaaa' : '#666',
      fontSize: '18px',
      marginBottom: '30px',
      transition: 'color 0.3s ease',
    },
    button: {
      padding: '12px 28px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '30px',
      backgroundColor: darkMode ? '#e0e0e0' : '#333',
      color: darkMode ? '#1a1a2e' : '#f0f0f0',
      boxShadow: darkMode
        ? '0 4px 14px rgba(255,255,255,0.15)'
        : '0 4px 14px rgba(0,0,0,0.2)',
      transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
    },
  };

  return (
    <div style={theme.container}>
      <h1 style={theme.heading}>Welcome to Simple React App</h1>
      <p style={theme.paragraph}>This is a basic React application!</p>
      <button
        onClick={toggleDarkMode}
        style={theme.button}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default App;
