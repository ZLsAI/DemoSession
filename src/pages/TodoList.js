import React, { useState } from 'react';
import { useTodos } from '../TodoContext';

const styles = {
  page: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  itemText: {
    fontSize: '16px',
    color: '#333',
  },
  deleteButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  empty: {
    color: '#999',
    fontStyle: 'italic',
    fontSize: '15px',
  },
  count: {
    marginBottom: '16px',
    color: '#555',
    fontSize: '15px',
  },
};

function TodoList() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>To-Do List</h1>
      <div style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a new to-do item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="New to-do input"
        />
        <button style={styles.addButton} onClick={handleAdd} aria-label="Add to-do">
          Add
        </button>
      </div>
      <p style={styles.count}>
        {todos.length === 0
          ? 'No active items.'
          : `${todos.length} active item${todos.length !== 1 ? 's' : ''}`}
      </p>
      {todos.length === 0 ? (
        <p style={styles.empty}>Your to-do list is empty. Add an item above!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.item}>
              <span style={styles.itemText}>{todo.text}</span>
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

export default TodoList;
