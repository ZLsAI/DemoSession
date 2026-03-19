import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CityWeather } from '../types';
import { useTheme } from '../context/ThemeContext';

interface WeatherCardProps {
  city: CityWeather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getConditionColor = (condition: string): string => {
    if (condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) {
      return isDark ? 'from-amber-600 to-orange-500' : 'from-amber-400 to-orange-300';
    }
    if (condition.toLowerCase().includes('rain')) {
      return isDark ? 'from-blue-700 to-indigo-600' : 'from-blue-400 to-indigo-300';
    }
    if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('partly')) {
      return isDark ? 'from-slate-600 to-slate-500' : 'from-slate-400 to-blue-300';
    }
    return isDark ? 'from-sky-700 to-cyan-600' : 'from-sky-400 to-cyan-300';
  };

  return (
    <div
      onClick={() => navigate(`/city/${city.name.toLowerCase()}`)}
      className={`rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'
      }`}
    >
      {/* Card Header Gradient */}
      <div className={`bg-gradient-to-br ${getConditionColor(city.condition)} p-6 text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{city.name}</h2>
            <p className="text-sm opacity-90 mt-1">{city.country} &bull; {city.condition}</p>
          </div>
          <span className="text-5xl">{city.icon}</span>
        </div>
        <div className="mt-4">
          <span className="text-6xl font-thin">{city.temperature}°</span>
          <span className="text-2xl ml-1">C</span>
        </div>
      </div>

      {/* Card Body */}
      <div className={`p-5 grid grid-cols-3 gap-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        <div className="text-center">
          <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Feels Like
          </p>
          <p className="text-lg font-semibold">{city.feelsLike}°C</p>
        </div>
        <div className="text-center border-x ${isDark ? 'border-slate-700' : 'border-slate-100'}">
          <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Humidity
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg">💧</span>
            <p className="text-lg font-semibold">{city.humidity}%</p>
          </div>
        </div>
        <div className="text-center">
          <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Wind
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg">💨</span>
            <p className="text-lg font-semibold">{city.windSpeed}</p>
          </div>
        </div>
      </div>

      {/* High / Low */}
      <div className={`px-5 pb-5 flex justify-between items-center`}>
        <div className={`flex gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span>⬆️ H: {city.high}°C</span>
          <span>⬇️ L: {city.low}°C</span>
        </div>
        <button
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            isDark
              ? 'bg-sky-700 text-sky-200 hover:bg-sky-600'
              : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
          }`}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
