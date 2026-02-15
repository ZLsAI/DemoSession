import React from 'react';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{ 
        flex: 1,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to Simple React App</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>This is a basic React application!</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
