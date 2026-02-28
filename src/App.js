import React from 'react';
import { useTheme } from './ThemeContext';

const themes = {
  light: {
    background: '#f0f0f0',
    container: '#ffffff',
    heading: '#333333',
    text: '#666666',
    button: {
      background: '#333333',
      color: '#ffffff',
      border: '2px solid #333333',
    },
  },
  dark: {
    background: '#1a1a2e',
    container: '#16213e',
    heading: '#e0e0e0',
    text: '#a0a0b0',
    button: {
      background: '#e0e0e0',
      color: '#1a1a2e',
      border: '2px solid #e0e0e0',
    },
  },
};

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      flexDirection: 'column',
      backgroundColor: theme.background,
      transition: 'background-color 0.3s ease',
    }}>
      <div style={{
        backgroundColor: theme.container,
        padding: '40px 60px',
        borderRadius: '12px',
        boxShadow: isDarkMode
          ? '0 4px 20px rgba(0, 0, 0, 0.5)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}>
        <h1 style={{
          color: theme.heading,
          marginBottom: '20px',
          transition: 'color 0.3s ease',
        }}>
          Welcome to Simple React App
        </h1>
        <p style={{
          color: theme.text,
          fontSize: '18px',
          marginBottom: '30px',
          transition: 'color 0.3s ease',
        }}>
          This is a basic React application!
        </p>
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: theme.button.background,
            color: theme.button.color,
            border: theme.button.border,
            padding: '10px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease, border 0.3s ease',
          }}
        >
          {isDarkMode ? '☀ Light Mode' : '☾ Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default App;
