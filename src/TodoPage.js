import React, { useState } from 'react';
import { useTodos } from './TodoContext';

const styles = {
  page: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '32px 16px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#1a1a2e',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4361ee',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    fontSize: '16px',
    color: '#333',
  },
  deleteButton: {
    padding: '6px 14px',
    fontSize: '14px',
    backgroundColor: '#ef233c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontSize: '16px',
    marginTop: '32px',
  },
};

function TodoPage() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  function handleAdd() {
    addTodo(inputValue);
    setInputValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>To-Do List</h1>
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a new to-do item..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="New to-do item"
        />
        <button style={styles.addButton} onClick={handleAdd} aria-label="Add item">
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={styles.empty}>No items yet. Add something above!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map(todo => (
            <li key={todo.id} style={styles.listItem}>
              <span>{todo.text}</span>
              <button
                style={styles.deleteButton}
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete ${todo.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoPage;
