import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';

function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div style={{ maxWidth: 640, margin: '2.5rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2d2d2d', margin: '0 0 0.4rem' }}>
          To-Do List
        </h1>
        {totalCount > 0 && (
          <p style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>
            {completedCount} of {totalCount} task{totalCount !== 1 ? 's' : ''} completed
          </p>
        )}
      </div>

      <form
        style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new to-do item..."
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '1rem',
            outline: 'none',
            background: '#fff',
            color: '#333',
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            background: inputValue.trim()
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
          }}
        >
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#aaa',
            background: '#fafafa',
            borderRadius: '12px',
            border: '2px dashed #e8e8e8',
          }}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>
            📋
          </span>
          <p style={{ margin: 0 }}>No to-do items yet. Add your first task above!</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                border: '1px solid #f0f0f0',
                opacity: todo.completed ? 0.65 : 1,
              }}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                style={{
                  width: '24px',
                  height: '24px',
                  border: todo.completed ? 'none' : '2px solid #d0d0d0',
                  borderRadius: '6px',
                  background: todo.completed
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: 0,
                  fontSize: '0.75rem',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                {todo.completed && '✓'}
              </button>
              <span
                style={{
                  flex: 1,
                  fontSize: '1rem',
                  color: todo.completed ? '#aaa' : '#333',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo"
                style={{
                  width: '28px',
                  height: '28px',
                  border: 'none',
                  borderRadius: '6px',
                  background: 'transparent',
                  color: '#ccc',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: 0,
                  fontFamily: 'inherit',
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
