import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
