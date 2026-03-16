import React from 'react';
import { Link } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';

function Counter() {
  const { todos } = useTodos();

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div style={{ maxWidth: 720, margin: '2.5rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2d2d2d', margin: '0 0 0.4rem' }}>
          Counter
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#888', margin: 0 }}>
          Overview of your to-do items
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
        <div style={{
          padding: '1.5rem 1rem',
          borderRadius: '14px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(102,126,234,0.13), rgba(118,75,162,0.13))',
          border: '1px solid rgba(102,126,234,0.27)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: '#667eea' }}>{totalCount}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Tasks</span>
        </div>
        <div style={{
          padding: '1.5rem 1rem',
          borderRadius: '14px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.13), rgba(52,211,153,0.13))',
          border: '1px solid rgba(16,185,129,0.27)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: '#10b981' }}>{completedCount}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Completed</span>
        </div>
        <div style={{
          padding: '1.5rem 1rem',
          borderRadius: '14px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.13), rgba(251,191,36,0.13))',
          border: '1px solid rgba(245,158,11,0.27)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: '#f59e0b' }}>{pendingCount}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending</span>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
          border: '1px solid #f0f0f0',
          marginBottom: '1.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, color: '#555', marginBottom: '0.6rem' }}>
            <span>Progress</span>
            <span>{completionPercent}%</span>
          </div>
          <div style={{ height: '10px', background: '#f0f0f0', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${completionPercent}%`,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '99px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}

      {/* Task Cards */}
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '1.5rem',
        boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
        border: '1px solid #f0f0f0',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2d2d2d', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          All Tasks
          {totalCount > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700,
              minWidth: '22px', height: '22px', padding: '0 6px',
            }}>
              {totalCount}
            </span>
          )}
        </h2>

        {todos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#aaa' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>📊</span>
            <p style={{ margin: 0 }}>
              No tasks yet. Go to the{' '}
              <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>
                To-Do List
              </Link>
              {' '}to add some!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {todos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: todo.completed ? '#f0fdf4' : '#fffbeb',
                  border: `1px solid ${todo.completed ? '#bbf7d0' : '#fde68a'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                  <span style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: todo.completed ? '#10b981' : '#f59e0b',
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.4px', width: '68px',
                    color: todo.completed ? '#10b981' : '#f59e0b',
                  }}>
                    {todo.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <p style={{
                  flex: 1, fontSize: '0.95rem',
                  color: todo.completed ? '#aaa' : '#333',
                  margin: 0, wordBreak: 'break-word',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}>
                  {todo.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Counter;
