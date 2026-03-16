import React from 'react';
import { useTodos } from './TodoContext';

const styles = {
  page: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '32px 16px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '40px',
  },
  card: {
    display: 'inline-block',
    padding: '40px 60px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
  },
  countLabel: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  count: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#4361ee',
    lineHeight: 1,
  },
  zeroCount: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#ccc',
    lineHeight: 1,
  },
  hint: {
    marginTop: '24px',
    fontSize: '14px',
    color: '#aaa',
  },
};

function CounterPage() {
  const { todos } = useTodos();
  const count = todos.length;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Counter</h1>
      <p style={styles.subtitle}>Displays the total number of active to-do items in real-time.</p>
      <div style={styles.card}>
        <p style={styles.countLabel}>Active To-Do Items</p>
        <p style={count === 0 ? styles.zeroCount : styles.count} aria-label="todo count">
          {count}
        </p>
        <p style={styles.hint}>
          {count === 0
            ? 'Go to the To-Do page to add items.'
            : `You have ${count} active item${count !== 1 ? 's' : ''}.`}
        </p>
      </div>
    </div>
  );
}

export default CounterPage;
