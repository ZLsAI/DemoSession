import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      backgroundColor: '#282c34',
      color: '#ffffff',
      padding: '20px',
      textAlign: 'center',
      marginTop: '40px',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <p style={{ margin: 0 }}>
        © {currentYear} Built with React
      </p>
    </footer>
  );
}

export default Footer;
