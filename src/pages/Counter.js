import React from 'react';
import { Link } from 'react-router-dom';
import { useTodos } from '../TodoContext';

const styles = {
  page: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '16px',
  },
  description: {
    color: '#666',
    fontSize: '16px',
    marginBottom: '40px',
  },
  counterBox: {
    display: 'inline-block',
    padding: '40px 60px',
    backgroundColor: '#fff',
    border: '2px solid #4CAF50',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    marginBottom: '32px',
  },
  counterLabel: {
    fontSize: '16px',
    color: '#888',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  counterValue: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: '#4CAF50',
    lineHeight: 1,
  },
  link: {
    display: 'inline-block',
    marginTop: '16px',
    padding: '10px 24px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '15px',
  },
  note: {
    marginTop: '24px',
    color: '#999',
    fontSize: '14px',
    fontStyle: 'italic',
  },
};

function Counter() {
  const { todos } = useTodos();

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Counter</h1>
      <p style={styles.description}>
        Real-time count of active to-do items, synced across both pages.
      </p>
      <div style={styles.counterBox}>
        <p style={styles.counterLabel}>Active To-Do Items</p>
        <div style={styles.counterValue}>{todos.length}</div>
      </div>
      <br />
      <Link to="/" style={styles.link}>
        Go to To-Do List
      </Link>
      <p style={styles.note}>
        {todos.length === 0
          ? 'Add items on the To-Do List page to see the counter update!'
          : `You have ${todos.length} active item${todos.length !== 1 ? 's' : ''} on your list.`}
      </p>
    </div>
  );
}

export default Counter;
