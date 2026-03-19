import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Settings
        </h1>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Customize your Weather Dashboard experience
        </p>
      </div>

      {/* Appearance Section */}
      <div
        className={`rounded-2xl p-6 mb-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Appearance
        </h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Manage how the dashboard looks
        </p>

        {/* Theme Toggle */}
        <div
          className={`flex items-center justify-between p-4 rounded-xl ${
            isDark ? 'bg-slate-700' : 'bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                isDark ? 'bg-slate-600' : 'bg-white shadow-sm'
              }`}
            >
              {isDark ? '🌙' : '☀️'}
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {isDark
                  ? 'Currently using dark theme — easier on the eyes'
                  : 'Currently using light theme — crisp and clean'}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
              isDark
                ? 'bg-sky-600 focus:ring-offset-slate-800'
                : 'bg-slate-200 focus:ring-offset-white'
            }`}
          >
            <span
              className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isDark ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Theme Preview */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => !isDark || toggleTheme()}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              !isDark
                ? 'border-sky-500 bg-sky-50'
                : isDark
                  ? 'border-slate-600 bg-slate-700 hover:border-slate-500'
                  : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="bg-white rounded-lg p-2 mb-2 shadow-sm">
              <div className="h-2 bg-slate-200 rounded w-3/4 mb-1" />
              <div className="h-2 bg-slate-100 rounded w-1/2" />
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              ☀️ Light
            </p>
            {!isDark && (
              <p className="text-xs text-sky-600 mt-0.5">Active</p>
            )}
          </button>

          <button
            onClick={() => isDark || toggleTheme()}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              isDark
                ? 'border-sky-500 bg-slate-700'
                : 'border-slate-200 bg-slate-50 hover:border-slate-300'
            }`}
          >
            <div className="bg-slate-800 rounded-lg p-2 mb-2">
              <div className="h-2 bg-slate-600 rounded w-3/4 mb-1" />
              <div className="h-2 bg-slate-700 rounded w-1/2" />
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              🌙 Dark
            </p>
            {isDark && (
              <p className="text-xs text-sky-400 mt-0.5">Active</p>
            )}
          </button>
        </div>
      </div>

      {/* Data Section */}
      <div
        className={`rounded-2xl p-6 mb-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Data & Sources
        </h2>
        <p className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Weather data configuration
        </p>

        {[
          {
            label: 'Data Source',
            value: 'Mock / Demo Data',
            description: 'Static mock data used for demonstration',
            icon: '📡',
          },
          {
            label: 'Cities Tracked',
            value: 'London, Tokyo, New York',
            description: 'Pre-configured city list',
            icon: '🌍',
          },
          {
            label: 'Update Frequency',
            value: 'Static (Demo)',
            description: 'Data does not refresh automatically in demo mode',
            icon: '🔄',
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between py-3 border-b last:border-b-0 ${
              isDark ? 'border-slate-700' : 'border-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {item.label}
                </p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {item.description}
                </p>
              </div>
            </div>
            <span
              className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div
        className={`rounded-2xl p-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <h2 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          About
        </h2>
        <div className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <p>🌤️ <strong className={isDark ? 'text-white' : 'text-slate-700'}>WeatherBoard</strong> — Weather Dashboard App</p>
          <p>Built with React, TypeScript, Vite, Tailwind CSS, and Recharts.</p>
          <p>Uses React Router v6 and React Context for state management.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
