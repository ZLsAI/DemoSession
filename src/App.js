import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  const countColor =
    count > 0
      ? 'text-emerald-500'
      : count < 0
      ? 'text-rose-500'
      : 'text-slate-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 w-80">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-700 tracking-tight">Counter</h1>

        {/* Count Display */}
        <div className="flex items-center justify-center w-40 h-40 rounded-full bg-slate-100 shadow-inner">
          <span className={`text-6xl font-extrabold tabular-nums transition-colors duration-300 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* Increment / Decrement Buttons */}
        <div className="flex gap-4">
          <button
            onClick={decrement}
            aria-label="Decrement"
            className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 text-2xl font-bold hover:bg-rose-200 active:scale-95 transition-all duration-150 shadow focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            −
          </button>
          <button
            onClick={increment}
            aria-label="Increment"
            className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold hover:bg-emerald-200 active:scale-95 transition-all duration-150 shadow focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            +
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          aria-label="Reset"
          className="text-sm text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors duration-150 focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
