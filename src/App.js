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
      : 'text-gray-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Counter</h1>

        {/* Count Display */}
        <div className="flex items-center justify-center w-48 h-48 rounded-full bg-gray-50 border-4 border-indigo-100 shadow-inner">
          <span className={`text-7xl font-extrabold tabular-nums transition-colors duration-300 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* Increment / Decrement Buttons */}
        <div className="flex gap-6">
          <button
            onClick={decrement}
            aria-label="Decrement"
            className="w-16 h-16 rounded-full bg-rose-100 hover:bg-rose-200 active:scale-95 text-rose-600 text-4xl font-bold transition-all duration-150 shadow-md flex items-center justify-center select-none"
          >
            −
          </button>

          <button
            onClick={increment}
            aria-label="Increment"
            className="w-16 h-16 rounded-full bg-emerald-100 hover:bg-emerald-200 active:scale-95 text-emerald-600 text-4xl font-bold transition-all duration-150 shadow-md flex items-center justify-center select-none"
          >
            +
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          aria-label="Reset"
          className="px-8 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 active:scale-95 text-indigo-600 text-sm font-semibold tracking-wide uppercase transition-all duration-150 shadow-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
