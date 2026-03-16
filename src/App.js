import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './TodoContext';
import Navbar from './Navbar';
import TodoPage from './TodoPage';
import CounterPage from './CounterPage';

const appStyle = {
  minHeight: '100vh',
  backgroundColor: '#f4f6fb',
};

function App() {
  return (
    <TodoProvider>
      <Router>
        <div style={appStyle}>
          <Navbar />
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/counter" element={<CounterPage />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
