import React, { useState } from 'react';

const questions = [
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: 2
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Saturn", "Mars"],
    answer: 3
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
    answer: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3
  }
];

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '620px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#e94560',
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 0 8px',
    letterSpacing: '1px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.95rem',
    margin: 0,
  },
  progressBar: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    height: '8px',
    marginBottom: '30px',
    overflow: 'hidden',
  },
  progressFill: (pct) => ({
    background: 'linear-gradient(90deg, #e94560, #f5a623)',
    height: '100%',
    width: `${pct}%`,
    borderRadius: '10px',
    transition: 'width 0.4s ease',
  }),
  questionCount: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.85rem',
    textAlign: 'right',
    marginBottom: '8px',
  },
  question: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.5',
    marginBottom: '28px',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  option: (state) => {
    const base = {
      padding: '14px 20px',
      borderRadius: '12px',
      border: '2px solid',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    };
    if (state === 'correct') {
      return { ...base, background: 'rgba(46, 213, 115, 0.2)', borderColor: '#2ed573', color: '#2ed573' };
    }
    if (state === 'wrong') {
      return { ...base, background: 'rgba(233, 69, 96, 0.2)', borderColor: '#e94560', color: '#e94560' };
    }
    if (state === 'disabled') {
      return { ...base, background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', cursor: 'default' };
    }
    return { ...base, background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' };
  },
  optionLabel: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  feedback: (correct) => ({
    marginTop: '20px',
    padding: '12px 18px',
    borderRadius: '10px',
    background: correct ? 'rgba(46, 213, 115, 0.15)' : 'rgba(233, 69, 96, 0.15)',
    border: `1px solid ${correct ? '#2ed573' : '#e94560'}`,
    color: correct ? '#2ed573' : '#e94560',
    fontSize: '0.95rem',
    fontWeight: '500',
    textAlign: 'center',
  }),
  nextBtn: {
    marginTop: '24px',
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(90deg, #e94560, #f5a623)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s ease',
  },
  resultsCard: {
    textAlign: 'center',
  },
  trophy: {
    fontSize: '4rem',
    marginBottom: '10px',
  },
  resultsTitle: {
    color: '#ffffff',
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  scoreDisplay: {
    color: '#e94560',
    fontSize: '3.5rem',
    fontWeight: '900',
    margin: '20px 0 8px',
    lineHeight: 1,
  },
  scoreDenom: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '1rem',
    marginBottom: '24px',
  },
  verdict: (pct) => ({
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '32px',
    padding: '14px 20px',
    borderRadius: '12px',
    background: pct >= 80
      ? 'rgba(46,213,115,0.15)'
      : pct >= 60
      ? 'rgba(245,166,35,0.15)'
      : 'rgba(233,69,96,0.15)',
    color: pct >= 80 ? '#2ed573' : pct >= 60 ? '#f5a623' : '#e94560',
    border: `1px solid ${pct >= 80 ? '#2ed573' : pct >= 60 ? '#f5a623' : '#e94560'}`,
  }),
  reviewList: {
    textAlign: 'left',
    marginBottom: '28px',
  },
  reviewItem: (correct) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '10px 14px',
    marginBottom: '8px',
    borderRadius: '10px',
    background: correct ? 'rgba(46,213,115,0.08)' : 'rgba(233,69,96,0.08)',
    border: `1px solid ${correct ? 'rgba(46,213,115,0.3)' : 'rgba(233,69,96,0.3)'}`,
  }),
  reviewIcon: (correct) => ({
    fontSize: '1rem',
    color: correct ? '#2ed573' : '#e94560',
    flexShrink: 0,
    marginTop: '2px',
  }),
  reviewText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '0.9rem',
    lineHeight: 1.4,
  },
  reviewAnswer: (correct) => ({
    color: correct ? '#2ed573' : '#e94560',
    fontWeight: '600',
    fontSize: '0.85rem',
  }),
  restartBtn: {
    padding: '14px 40px',
    background: 'linear-gradient(90deg, #e94560, #f5a623)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  startCard: {
    textAlign: 'center',
  },
  startIcon: {
    fontSize: '4rem',
    marginBottom: '16px',
  },
  startTitle: {
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '12px',
  },
  startDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  startDetails: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '36px',
    flexWrap: 'wrap',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  detailValue: {
    color: '#e94560',
    fontSize: '1.4rem',
    fontWeight: '700',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  startBtn: {
    padding: '16px 50px',
    background: 'linear-gradient(90deg, #e94560, #f5a623)',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    boxShadow: '0 8px 20px rgba(233,69,96,0.35)',
  },
};

const LABELS = ['A', 'B', 'C', 'D'];

function getVerdict(pct) {
  if (pct === 100) return "Perfect score! Outstanding!";
  if (pct >= 80) return "Excellent work! Almost perfect!";
  if (pct >= 60) return "Good job! Keep it up!";
  if (pct >= 40) return "Not bad, but there's room to improve.";
  return "Keep studying, you'll do better next time!";
}

export default function App() {
  const [phase, setPhase] = useState('start'); // 'start' | 'quiz' | 'results'
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  function handleStart() {
    setPhase('quiz');
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setUserAnswers([]);
  }

  function handleSelect(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setUserAnswers(prev => [...prev, { questionIdx: current, chosen: idx, correct: idx === q.answer }]);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase('results');
    }
  }

  function handleRestart() {
    setPhase('start');
  }

  function getOptionState(idx) {
    if (!answered) return 'default';
    if (idx === q.answer) return 'correct';
    if (idx === selected && selected !== q.answer) return 'wrong';
    return 'disabled';
  }

  const score = userAnswers.filter(a => a.correct).length;
  const scorePct = Math.round((score / questions.length) * 100);

  if (phase === 'start') {
    return (
      <div style={styles.app}>
        <div style={styles.card}>
          <div style={styles.startCard}>
            <div style={styles.startIcon}>&#127941;</div>
            <h1 style={styles.startTitle}>General Knowledge Quiz</h1>
            <p style={styles.startDesc}>
              Test your knowledge with 5 questions spanning geography,
              science, art, and more. Choose wisely — only one answer is correct!
            </p>
            <div style={styles.startDetails}>
              <div style={styles.detailItem}>
                <span style={styles.detailValue}>5</span>
                <span style={styles.detailLabel}>Questions</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailValue}>4</span>
                <span style={styles.detailLabel}>Choices Each</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailValue}>&#8734;</span>
                <span style={styles.detailLabel}>No Time Limit</span>
              </div>
            </div>
            <button style={styles.startBtn} onClick={handleStart}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div style={styles.app}>
        <div style={styles.card}>
          <div style={styles.resultsCard}>
            <div style={styles.trophy}>&#127942;</div>
            <h2 style={styles.resultsTitle}>Quiz Complete!</h2>
            <div style={styles.scoreDisplay}>{score}</div>
            <p style={styles.scoreDenom}>out of {questions.length} correct</p>
            <div style={styles.verdict(scorePct)}>
              {getVerdict(scorePct)}
            </div>
            <div style={styles.reviewList}>
              {userAnswers.map((ans, i) => (
                <div key={i} style={styles.reviewItem(ans.correct)}>
                  <span style={styles.reviewIcon(ans.correct)}>
                    {ans.correct ? '✓' : '✗'}
                  </span>
                  <div>
                    <div style={styles.reviewText}>{questions[ans.questionIdx].question}</div>
                    {!ans.correct && (
                      <div style={styles.reviewAnswer(false)}>
                        Your answer: {questions[ans.questionIdx].options[ans.chosen]}
                      </div>
                    )}
                    <div style={styles.reviewAnswer(true)}>
                      Correct: {questions[ans.questionIdx].options[questions[ans.questionIdx].answer]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.restartBtn} onClick={handleRestart}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // quiz phase
  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>General Knowledge Quiz</h1>
          <p style={styles.subtitle}>One question at a time</p>
        </div>

        <div style={styles.questionCount}>
          Question {current + 1} of {questions.length}
        </div>
        <div style={styles.progressBar}>
          <div style={styles.progressFill(progress)} />
        </div>

        <div style={styles.question}>{q.question}</div>

        <div style={styles.options}>
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              style={styles.option(getOptionState(idx))}
              onClick={() => handleSelect(idx)}
              disabled={answered && idx !== q.answer && idx !== selected}
            >
              <span style={styles.optionLabel}>{LABELS[idx]}</span>
              {opt}
            </button>
          ))}
        </div>

        {answered && (
          <div style={styles.feedback(selected === q.answer)}>
            {selected === q.answer
              ? '✓ Correct! Well done!'
              : `✗ Incorrect. The correct answer is: ${q.options[q.answer]}`}
          </div>
        )}

        {answered && (
          <button style={styles.nextBtn} onClick={handleNext}>
            {current + 1 < questions.length ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
