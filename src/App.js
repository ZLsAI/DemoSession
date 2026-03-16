import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import TodoList from './pages/TodoList';
import Counter from './pages/Counter';
import './index.css';

function App() {
  return (
    <TodoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
