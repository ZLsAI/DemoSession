import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TodoProvider } from './TodoContext';
import NavBar from './components/NavBar';
import TodoList from './pages/TodoList';
import Counter from './pages/Counter';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
