import React from 'react';
import WeatherCard from '../components/WeatherCard';
import { citiesWeatherData } from '../data/weatherData';
import { useTheme } from '../context/ThemeContext';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const avgTemp = Math.round(
    citiesWeatherData.reduce((sum, c) => sum + c.temperature, 0) / citiesWeatherData.length
  );
  const avgHumidity = Math.round(
    citiesWeatherData.reduce((sum, c) => sum + c.humidity, 0) / citiesWeatherData.length
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Weather Dashboard
            </h1>
            <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {dateStr}
            </p>
          </div>
          <div className={`flex gap-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <span className="flex items-center gap-1">
              <span>🌡️</span>
              <span>Avg Temp: <strong>{avgTemp}°C</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span>💧</span>
              <span>Avg Humidity: <strong>{avgHumidity}%</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Cities Tracked', value: '3', icon: '🌍' },
          { label: 'Best Weather', value: 'Tokyo', icon: '☀️' },
          { label: 'Last Updated', value: 'Just now', icon: '🕐' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-4 flex items-center gap-4 ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
            }`}
          >
            <span className="text-3xl">{stat.icon}</span>
            <div>
              <p className={`text-xs uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {stat.label}
              </p>
              <p className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* City Cards */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Current Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {citiesWeatherData.map((city) => (
            <WeatherCard key={city.name} city={city} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className={`mt-8 text-xs text-center ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
        All data shown is mock/demo data for demonstration purposes.
      </p>
    </div>
  );
};

export default HomePage;
