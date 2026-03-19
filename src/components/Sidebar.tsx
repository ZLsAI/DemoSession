import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? isDark
          ? 'bg-sky-600 text-white shadow-lg'
          : 'bg-sky-500 text-white shadow-lg'
        : isDark
          ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
          : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 flex flex-col z-10 shadow-xl transition-colors duration-300 ${
        isDark ? 'bg-slate-800 border-r border-slate-700' : 'bg-white border-r border-slate-200'
      }`}
    >
      {/* Logo */}
      <div className={`px-6 py-6 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌤️</span>
          <div>
            <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              WeatherBoard
            </h1>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Live Weather Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 px-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Navigation
        </p>

        <NavLink to="/" end className={navLinkClass}>
          <span className="text-lg">🏠</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/city/london" className={navLinkClass}>
          <span className="text-lg">🌆</span>
          <span>London</span>
        </NavLink>

        <NavLink to="/city/tokyo" className={navLinkClass}>
          <span className="text-lg">🌸</span>
          <span>Tokyo</span>
        </NavLink>

        <NavLink to="/city/new york" className={navLinkClass}>
          <span className="text-lg">🗽</span>
          <span>New York</span>
        </NavLink>

        <div className={`my-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'}`} />

        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 px-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Preferences
        </p>

        <NavLink to="/settings" className={navLinkClass}>
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className={`px-6 py-4 border-t ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-400'}`}>
        <p className="text-xs">Mock Data &bull; Updated just now</p>
      </div>
    </aside>
  );
};

export default Sidebar;
