import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const enableDarkMode = () => setDarkMode(true);
  const enableLightMode = () => setDarkMode(false);

  const theme = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      flexDirection: 'column',
      backgroundColor: darkMode ? '#1a1a2e' : '#f0f4ff',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    heading: {
      color: darkMode ? '#e0e0e0' : '#1a1a2e',
      marginBottom: '20px',
      fontSize: '2rem',
      transition: 'color 0.3s ease',
    },
    paragraph: {
      color: darkMode ? '#aaaaaa' : '#555',
      fontSize: '18px',
      marginBottom: '36px',
      transition: 'color 0.3s ease',
    },
    buttonRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    },
    darkButton: {
      padding: '14px 36px',
      fontSize: '17px',
      fontWeight: '800',
      cursor: 'pointer',
      border: darkMode ? '2px solid #555' : '2px solid transparent',
      borderRadius: '30px',
      backgroundColor: darkMode ? '#2a2a4a' : '#1a1a2e',
      color: '#ffffff',
      boxShadow: darkMode
        ? '0 0 0 3px rgba(255,255,255,0.12), 0 6px 20px rgba(0,0,0,0.5)'
        : '0 6px 24px rgba(26,26,46,0.55)',
      transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
      letterSpacing: '0.03em',
      opacity: darkMode ? 0.65 : 1,
    },
    lightButton: {
      padding: '14px 36px',
      fontSize: '17px',
      fontWeight: '800',
      cursor: 'pointer',
      border: darkMode ? '2px solid transparent' : '2px solid #d0d8f0',
      borderRadius: '30px',
      backgroundColor: darkMode ? '#f0f4ff' : '#ffffff',
      color: '#1a1a2e',
      boxShadow: darkMode
        ? '0 6px 24px rgba(240,244,255,0.35)'
        : '0 0 0 3px rgba(26,26,46,0.10), 0 6px 20px rgba(0,0,0,0.12)',
      transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
      letterSpacing: '0.03em',
      opacity: darkMode ? 1 : 0.65,
    },
    badge: {
      display: 'inline-block',
      marginTop: '24px',
      padding: '4px 14px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,46,0.08)',
      color: darkMode ? '#ccc' : '#555',
      letterSpacing: '0.05em',
    },
  };

  return (
    <div style={theme.container}>
      <h1 style={theme.heading}>Welcome to Simple React App</h1>
      <p style={theme.paragraph}>This is a basic React application!</p>
      <div style={theme.buttonRow}>
        <button
          onClick={enableDarkMode}
          style={theme.darkButton}
          aria-label="Switch to dark mode"
          aria-pressed={darkMode}
        >
          🌙 Dark Mode
        </button>
        <button
          onClick={enableLightMode}
          style={theme.lightButton}
          aria-label="Switch to light mode"
          aria-pressed={!darkMode}
        >
          ☀️ Light Mode
        </button>
      </div>
      <span style={theme.badge}>
        {darkMode ? 'Dark mode active' : 'Light mode active'}
      </span>
    </div>
  );
}

export default App;
