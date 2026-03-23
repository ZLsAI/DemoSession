import React, { useState } from 'react';

const styles = {
  body: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 16px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: 'border-box',
  },
  container: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
    padding: '40px',
    width: '100%',
    maxWidth: '560px',
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2d3748',
    margin: '0 0 6px 0',
  },
  subtitle: {
    color: '#718096',
    fontSize: '0.95rem',
    margin: 0,
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '28px',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    color: '#2d3748',
  },
  addBtn: {
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.2s, transform 0.1s',
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  stat: {
    background: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '0.82rem',
    color: '#718096',
    fontWeight: '500',
  },
  statAccent: {
    fontWeight: '700',
    color: '#667eea',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '14px 16px',
    transition: 'background 0.2s, opacity 0.2s',
  },
  itemCompleted: {
    background: '#f0fff4',
    border: '1px solid #c6f6d5',
    opacity: '0.8',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    accentColor: '#667eea',
    cursor: 'pointer',
    flexShrink: 0,
  },
  taskText: {
    flex: 1,
    fontSize: '1rem',
    color: '#2d3748',
    wordBreak: 'break-word',
  },
  taskTextCompleted: {
    textDecoration: 'line-through',
    color: '#a0aec0',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fc8181',
    fontSize: '1.1rem',
    padding: '4px 6px',
    borderRadius: '6px',
    lineHeight: 1,
    transition: 'background 0.15s, color 0.15s',
    flexShrink: 0,
  },
  empty: {
    textAlign: 'center',
    color: '#a0aec0',
    padding: '40px 0',
    fontSize: '0.95rem',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '12px',
    display: 'block',
  },
  clearBtn: {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    background: 'none',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    color: '#718096',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s',
  },
};

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Read a book', completed: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [nextId, setNextId] = useState(3);

  const addTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTasks(prev => [...prev, { id: nextId, text: trimmed, completed: false }]);
    setNextId(prev => prev + 1);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My To-Do List</h1>
          <p style={styles.subtitle}>Stay organized and get things done</p>
        </div>

        <div style={styles.inputRow}>
          <input
            id="task-input"
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
          <button
            id="add-btn"
            onClick={addTask}
            style={styles.addBtn}
          >
            Add Task
          </button>
        </div>

        {total > 0 && (
          <div style={styles.statsRow}>
            <span style={styles.stat}>
              Total: <span style={styles.statAccent}>{total}</span>
            </span>
            <span style={styles.stat}>
              Remaining: <span style={styles.statAccent}>{remaining}</span>
            </span>
            <span style={styles.stat}>
              Completed: <span style={styles.statAccent}>{completed}</span>
            </span>
          </div>
        )}

        {tasks.length === 0 ? (
          <div style={styles.empty}>
            <span style={styles.emptyIcon}>&#10003;</span>
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          <ul style={styles.list} id="task-list">
            {tasks.map(task => (
              <li
                key={task.id}
                style={{ ...styles.item, ...(task.completed ? styles.itemCompleted : {}) }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={styles.checkbox}
                  aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <span
                  style={{ ...styles.taskText, ...(task.completed ? styles.taskTextCompleted : {}) }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={styles.deleteBtn}
                  title="Delete task"
                  aria-label={`Delete task: ${task.text}`}
                >
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
        )}

        {completed > 0 && (
          <button style={styles.clearBtn} onClick={clearCompleted}>
            Clear {completed} completed task{completed !== 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
