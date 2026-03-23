import React, { useState, useEffect, useRef, useCallback } from 'react';

const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function App() {
  const [inputMinutes, setInputMinutes] = useState(1);
  const [inputSeconds, setInputSeconds] = useState(30);
  const [totalTime, setTotalTime] = useState(90); // minutes*60+seconds
  const [timeLeft, setTimeLeft] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);

  const progress = totalTime > 0 ? timeLeft / totalTime : 1;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return () => clearTimer();
  }, [isRunning]);

  const handleStart = () => {
    if (timeLeft === 0) return;
    if (!hasStarted) {
      const total = inputMinutes * 60 + inputSeconds;
      if (total <= 0) return;
      setTotalTime(total);
      setTimeLeft(total);
      setHasStarted(true);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    clearTimer();
    setIsRunning(false);
    setHasStarted(false);
    const total = inputMinutes * 60 + inputSeconds;
    setTotalTime(total);
    setTimeLeft(total);
  };

  const handleMinutesChange = (e) => {
    const val = Math.max(0, Math.min(99, parseInt(e.target.value) || 0));
    setInputMinutes(val);
    if (!hasStarted) {
      const total = val * 60 + inputSeconds;
      setTotalTime(total);
      setTimeLeft(total);
    }
  };

  const handleSecondsChange = (e) => {
    const val = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setInputSeconds(val);
    if (!hasStarted) {
      const total = inputMinutes * 60 + val;
      setTotalTime(total);
      setTimeLeft(total);
    }
  };

  const isFinished = timeLeft === 0 && hasStarted;

  // Ring color based on progress
  let ringColor = '#4f9cf9';
  if (progress <= 0.25) ringColor = '#ef4444';
  else if (progress <= 0.5) ringColor = '#f59e0b';

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h1 style={styles.title}>Countdown Timer</h1>

        {/* Progress Ring */}
        <div style={styles.ringContainer}>
          <svg width="280" height="280" style={styles.svg}>
            {/* Background track */}
            <circle
              cx="140"
              cy="140"
              r={RADIUS}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="16"
            />
            {/* Progress arc */}
            <circle
              cx="140"
              cy="140"
              r={RADIUS}
              fill="none"
              stroke={ringColor}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease', transform: 'rotate(-90deg)', transformOrigin: '140px 140px' }}
            />
          </svg>
          {/* Center display */}
          <div style={styles.centerDisplay}>
            {isFinished ? (
              <span style={{ ...styles.timeText, color: '#ef4444', fontSize: '20px', fontWeight: 700 }}>Time&apos;s Up!</span>
            ) : (
              <span style={styles.timeText}>
                {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
              </span>
            )}
            {!isFinished && (
              <span style={styles.progressLabel}>{Math.round(progress * 100)}%</span>
            )}
          </div>
        </div>

        {/* Inputs */}
        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Minutes</label>
            <input
              type="number"
              min="0"
              max="99"
              value={inputMinutes}
              onChange={handleMinutesChange}
              disabled={hasStarted}
              style={{ ...styles.input, ...(hasStarted ? styles.inputDisabled : {}) }}
            />
          </div>
          <div style={styles.separator}>:</div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={inputSeconds}
              onChange={handleSecondsChange}
              disabled={hasStarted}
              style={{ ...styles.input, ...(hasStarted ? styles.inputDisabled : {}) }}
            />
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={timeLeft === 0}
              style={{ ...styles.btn, ...styles.btnStart, ...(timeLeft === 0 ? styles.btnDisabled : {}) }}
            >
              {hasStarted && timeLeft > 0 ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button onClick={handlePause} style={{ ...styles.btn, ...styles.btnPause }}>
              Pause
            </button>
          )}
          <button onClick={handleReset} style={{ ...styles.btn, ...styles.btnReset }}>
            Reset
          </button>
        </div>

        {isFinished && (
          <div style={styles.finishedBanner}>
            Timer complete! Click Reset to start again.
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2040 100%)',
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px 48px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '340px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#1e3a5f',
    marginBottom: '28px',
    letterSpacing: '0.5px',
  },
  ringContainer: {
    position: 'relative',
    width: '280px',
    height: '280px',
    marginBottom: '28px',
  },
  svg: {
    display: 'block',
  },
  centerDisplay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeText: {
    fontSize: '44px',
    fontWeight: 700,
    color: '#1e3a5f',
    letterSpacing: '2px',
    lineHeight: 1.1,
  },
  progressLabel: {
    fontSize: '14px',
    color: '#94a3b8',
    marginTop: '4px',
    fontWeight: 500,
  },
  inputRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    marginBottom: '28px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '80px',
    height: '48px',
    fontSize: '22px',
    fontWeight: 700,
    textAlign: 'center',
    border: '2px solid #cbd5e1',
    borderRadius: '10px',
    outline: 'none',
    color: '#1e3a5f',
    background: '#f8fafc',
    transition: 'border-color 0.2s',
  },
  inputDisabled: {
    background: '#f1f5f9',
    color: '#94a3b8',
    cursor: 'not-allowed',
  },
  separator: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#94a3b8',
    paddingBottom: '8px',
  },
  controls: {
    display: 'flex',
    gap: '14px',
  },
  btn: {
    padding: '12px 32px',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
    letterSpacing: '0.5px',
  },
  btnStart: {
    background: 'linear-gradient(135deg, #4f9cf9 0%, #2563eb 100%)',
    color: '#fff',
    boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
  },
  btnPause: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#fff',
    boxShadow: '0 4px 14px rgba(217,119,6,0.4)',
  },
  btnReset: {
    background: '#f1f5f9',
    color: '#475569',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  finishedBanner: {
    marginTop: '20px',
    padding: '12px 24px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    color: '#ef4444',
    fontWeight: 600,
    fontSize: '14px',
  },
};

export default App;
