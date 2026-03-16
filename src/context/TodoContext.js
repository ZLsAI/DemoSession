import React, { createContext, useContext, useState, useCallback } from 'react';

const TodoContext = createContext(null);

let nextId = 1;

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: nextId++, text: text.trim(), completed: false },
    ]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
