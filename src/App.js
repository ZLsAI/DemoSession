import React from 'react';

function App() {
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
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to Simple React App</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>This is a basic React application!</p>
    </div>
  );
}

export default App;
