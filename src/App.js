import React, { useState, useEffect, useCallback } from 'react';

// Weather data for various cities (mock data)
const WEATHER_DATABASE = {
  'new york': {
    city: 'New York',
    country: 'US',
    temperature: 22,
    feelsLike: 20,
    humidity: 65,
    windSpeed: 14,
    visibility: 10,
    description: 'Partly Cloudy',
    icon: '⛅',
    uvIndex: 4,
    forecast: [
      { day: 'Mon', high: 24, low: 16, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Tue', high: 19, low: 13, icon: '🌧️', desc: 'Rainy' },
      { day: 'Wed', high: 17, low: 11, icon: '⛈️', desc: 'Thunderstorm' },
      { day: 'Thu', high: 21, low: 14, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Fri', high: 26, low: 18, icon: '☀️', desc: 'Sunny' },
    ]
  },
  'london': {
    city: 'London',
    country: 'GB',
    temperature: 14,
    feelsLike: 11,
    humidity: 78,
    windSpeed: 20,
    visibility: 8,
    description: 'Overcast',
    icon: '☁️',
    uvIndex: 2,
    forecast: [
      { day: 'Mon', high: 15, low: 9, icon: '🌧️', desc: 'Drizzle' },
      { day: 'Tue', high: 13, low: 8, icon: '🌧️', desc: 'Rainy' },
      { day: 'Wed', high: 16, low: 10, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Thu', high: 18, low: 12, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Fri', high: 17, low: 11, icon: '☁️', desc: 'Cloudy' },
    ]
  },
  'tokyo': {
    city: 'Tokyo',
    country: 'JP',
    temperature: 28,
    feelsLike: 31,
    humidity: 72,
    windSpeed: 8,
    visibility: 12,
    description: 'Sunny',
    icon: '☀️',
    uvIndex: 7,
    forecast: [
      { day: 'Mon', high: 30, low: 24, icon: '☀️', desc: 'Sunny' },
      { day: 'Tue', high: 29, low: 23, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Wed', high: 27, low: 22, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Thu', high: 25, low: 20, icon: '🌧️', desc: 'Rainy' },
      { day: 'Fri', high: 28, low: 22, icon: '☀️', desc: 'Sunny' },
    ]
  },
  'paris': {
    city: 'Paris',
    country: 'FR',
    temperature: 18,
    feelsLike: 16,
    humidity: 60,
    windSpeed: 12,
    visibility: 15,
    description: 'Clear Sky',
    icon: '🌤️',
    uvIndex: 5,
    forecast: [
      { day: 'Mon', high: 20, low: 13, icon: '☀️', desc: 'Sunny' },
      { day: 'Tue', high: 22, low: 14, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Wed', high: 19, low: 12, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Thu', high: 16, low: 10, icon: '🌧️', desc: 'Rainy' },
      { day: 'Fri', high: 18, low: 11, icon: '🌤️', desc: 'Mostly Sunny' },
    ]
  },
  'sydney': {
    city: 'Sydney',
    country: 'AU',
    temperature: 32,
    feelsLike: 35,
    humidity: 55,
    windSpeed: 18,
    visibility: 20,
    description: 'Hot & Sunny',
    icon: '☀️',
    uvIndex: 9,
    forecast: [
      { day: 'Mon', high: 34, low: 24, icon: '☀️', desc: 'Very Hot' },
      { day: 'Tue', high: 31, low: 22, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Wed', high: 28, low: 20, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Thu', high: 26, low: 18, icon: '🌧️', desc: 'Showers' },
      { day: 'Fri', high: 29, low: 21, icon: '☀️', desc: 'Sunny' },
    ]
  },
  'dubai': {
    city: 'Dubai',
    country: 'AE',
    temperature: 41,
    feelsLike: 45,
    humidity: 35,
    windSpeed: 10,
    visibility: 25,
    description: 'Clear & Hot',
    icon: '🌣',
    uvIndex: 11,
    forecast: [
      { day: 'Mon', high: 43, low: 32, icon: '☀️', desc: 'Scorching' },
      { day: 'Tue', high: 42, low: 31, icon: '☀️', desc: 'Very Hot' },
      { day: 'Wed', high: 40, low: 30, icon: '🌤️', desc: 'Hot' },
      { day: 'Thu', high: 38, low: 29, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Fri', high: 41, low: 31, icon: '☀️', desc: 'Very Hot' },
    ]
  },
  'moscow': {
    city: 'Moscow',
    country: 'RU',
    temperature: -5,
    feelsLike: -10,
    humidity: 85,
    windSpeed: 25,
    visibility: 5,
    description: 'Heavy Snow',
    icon: '❄️',
    uvIndex: 1,
    forecast: [
      { day: 'Mon', high: -3, low: -8, icon: '🌨️', desc: 'Snowing' },
      { day: 'Tue', high: -6, low: -12, icon: '❄️', desc: 'Blizzard' },
      { day: 'Wed', high: -4, low: -9, icon: '🌨️', desc: 'Light Snow' },
      { day: 'Thu', high: -1, low: -6, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Fri', high: 2, low: -3, icon: '🌤️', desc: 'Clearing' },
    ]
  },
  'toronto': {
    city: 'Toronto',
    country: 'CA',
    temperature: 8,
    feelsLike: 4,
    humidity: 70,
    windSpeed: 22,
    visibility: 9,
    description: 'Breezy',
    icon: '🌬️',
    uvIndex: 3,
    forecast: [
      { day: 'Mon', high: 10, low: 4, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Tue', high: 7, low: 2, icon: '🌧️', desc: 'Rainy' },
      { day: 'Wed', high: 5, low: 0, icon: '🌨️', desc: 'Rain/Snow' },
      { day: 'Thu', high: 9, low: 3, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Fri', high: 12, low: 5, icon: '☀️', desc: 'Sunny' },
    ]
  },
  'berlin': {
    city: 'Berlin',
    country: 'DE',
    temperature: 11,
    feelsLike: 8,
    humidity: 68,
    windSpeed: 16,
    visibility: 11,
    description: 'Mostly Cloudy',
    icon: '🌥️',
    uvIndex: 3,
    forecast: [
      { day: 'Mon', high: 13, low: 7, icon: '⛅', desc: 'Partly Cloudy' },
      { day: 'Tue', high: 15, low: 8, icon: '🌤️', desc: 'Mostly Sunny' },
      { day: 'Wed', high: 12, low: 6, icon: '🌧️', desc: 'Rainy' },
      { day: 'Thu', high: 10, low: 5, icon: '🌧️', desc: 'Drizzle' },
      { day: 'Fri', high: 14, low: 7, icon: '⛅', desc: 'Partly Cloudy' },
    ]
  },
  'mumbai': {
    city: 'Mumbai',
    country: 'IN',
    temperature: 34,
    feelsLike: 38,
    humidity: 80,
    windSpeed: 15,
    visibility: 7,
    description: 'Hot & Humid',
    icon: '🌦️',
    uvIndex: 8,
    forecast: [
      { day: 'Mon', high: 35, low: 27, icon: '🌦️', desc: 'Humid' },
      { day: 'Tue', high: 33, low: 26, icon: '🌧️', desc: 'Monsoon' },
      { day: 'Wed', high: 31, low: 25, icon: '⛈️', desc: 'Thunderstorm' },
      { day: 'Thu', high: 32, low: 26, icon: '🌦️', desc: 'Showers' },
      { day: 'Fri', high: 34, low: 27, icon: '☀️', desc: 'Sunny' },
    ]
  }
};

const DEFAULT_CITY = 'new york';

const SUGGESTED_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Moscow', 'Toronto', 'Berlin', 'Mumbai'];

function getUVLevel(uv) {
  if (uv <= 2) return { label: 'Low', color: 'text-green-400' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-400' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-400' };
  return { label: 'Extreme', color: 'text-purple-400' };
}

function getTemperatureColor(temp) {
  if (temp < 0) return 'from-blue-300 to-cyan-400';
  if (temp < 10) return 'from-blue-400 to-blue-500';
  if (temp < 20) return 'from-cyan-400 to-teal-400';
  if (temp < 30) return 'from-yellow-400 to-orange-400';
  return 'from-orange-400 to-red-500';
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200">
      <span className="text-2xl">{icon}</span>
      <span className="text-white/60 text-xs uppercase tracking-wider font-medium">{label}</span>
      <span className="text-white font-semibold text-sm">{value}</span>
    </div>
  );
}

function ForecastCard({ day, high, low, icon, desc, index }) {
  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-all duration-200 cursor-default flex-1"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="text-white/70 font-semibold text-sm">{day}</span>
      <span className="forecast-icon">{icon}</span>
      <span className="text-white/60 text-xs text-center">{desc}</span>
      <div className="flex gap-2 items-center mt-1">
        <span className="text-white font-bold text-sm">{high}°</span>
        <span className="text-white/40 text-xs">/</span>
        <span className="text-white/50 text-sm">{low}°</span>
      </div>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [unit, setUnit] = useState('C'); // C or F

  const loadWeather = useCallback((cityKey) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const data = WEATHER_DATABASE[cityKey.toLowerCase()];
      if (data) {
        setCurrentWeather(data);
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      } else {
        setError(`City "${cityKey}" not found. Try: ${SUGGESTED_CITIES.join(', ')}`);
      }
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    loadWeather(searchQuery.trim());
    setSearchQuery('');
  };

  const handleSuggestionClick = (city) => {
    setShowSuggestions(false);
    setSearchQuery('');
    loadWeather(city);
  };

  const toF = (c) => Math.round((c * 9/5) + 32);
  const displayTemp = (c) => unit === 'C' ? `${c}°C` : `${toF(c)}°F`;
  const displayTempShort = (c) => unit === 'C' ? `${c}°` : `${toF(c)}°`;

  const filteredSuggestions = SUGGESTED_CITIES.filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  return (
    <div className="min-h-screen py-8 px-4" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
            🌤️ Weather Dashboard
          </h1>
          <p className="text-white/50 text-sm">Real-time weather at your fingertips</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 animate-fade-in">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search city (e.g. London, Tokyo, Paris...)"
                className="search-input w-full rounded-2xl py-4 pl-12 pr-4 text-white text-base"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full glass rounded-2xl overflow-hidden z-10 shadow-2xl">
                  {filteredSuggestions.map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleSuggestionClick(city)}
                      className="w-full text-left px-5 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-150 flex items-center gap-3"
                    >
                      <span className="text-sm">📍</span>
                      <span className="text-sm font-medium">{city}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-2xl px-6 py-4 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="glass rounded-2xl p-4 mb-6 border border-red-400/30 bg-red-500/10 animate-fade-in">
            <p className="text-red-300 text-sm text-center">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="text-5xl mb-4 animate-spin" style={{ animationDuration: '2s' }}>🌀</div>
            <p className="text-white/60 text-sm">Fetching weather data...</p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && currentWeather && (
          <div className="animate-slide-up">
            {/* Main Card */}
            <div className="glass rounded-3xl p-6 mb-6 relative overflow-hidden">
              {/* Background gradient accent */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
              />

              {/* City & Time */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    📍 {currentWeather.city}
                    <span className="text-white/40 text-base font-normal">{currentWeather.country}</span>
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  {lastUpdated && (
                    <p className="text-white/30 text-xs mt-1">Last updated: {lastUpdated}</p>
                  )}
                </div>
                {/* Unit Toggle */}
                <div className="flex bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setUnit('C')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      unit === 'C' ? 'bg-blue-500 text-white shadow-md' : 'text-white/50 hover:text-white'
                    }`}
                  >°C</button>
                  <button
                    onClick={() => setUnit('F')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      unit === 'F' ? 'bg-blue-500 text-white shadow-md' : 'text-white/50 hover:text-white'
                    }`}
                  >°F</button>
                </div>
              </div>

              {/* Temperature & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className={`text-7xl font-bold bg-gradient-to-br ${getTemperatureColor(currentWeather.temperature)} bg-clip-text text-transparent`}>
                    {unit === 'C' ? `${currentWeather.temperature}°` : `${toF(currentWeather.temperature)}°`}
                    <span className="text-3xl ml-1">{unit}</span>
                  </div>
                  <p className="text-white/60 text-lg mt-2">{currentWeather.description}</p>
                  <p className="text-white/40 text-sm mt-1">
                    Feels like {unit === 'C' ? `${currentWeather.feelsLike}°C` : `${toF(currentWeather.feelsLike)}°F`}
                  </p>
                </div>
                <div className="weather-icon mr-4 opacity-90">
                  {currentWeather.icon}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard icon="💧" label="Humidity" value={`${currentWeather.humidity}%`} />
                <StatCard icon="💨" label="Wind" value={`${currentWeather.windSpeed} km/h`} />
                <StatCard icon="👁️" label="Visibility" value={`${currentWeather.visibility} km`} />
                <StatCard icon="☀️" label="UV Index" value={
                  <span className={getUVLevel(currentWeather.uvIndex).color}>
                    {currentWeather.uvIndex} · {getUVLevel(currentWeather.uvIndex).label}
                  </span>
                } />
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>📅</span> 5-Day Forecast
              </h3>
              <div className="flex gap-3">
                {currentWeather.forecast.map((day, i) => (
                  <ForecastCard
                    key={day.day}
                    {...day}
                    high={unit === 'C' ? day.high : toF(day.high)}
                    low={unit === 'C' ? day.low : toF(day.low)}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* Quick City Switcher */}
            <div className="glass rounded-3xl p-5 mt-6">
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
                🌍 Popular Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_CITIES.map(city => (
                  <button
                    key={city}
                    onClick={() => handleSuggestionClick(city)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      currentWeather.city === city
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'glass-card text-white/60 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-8">
          Weather Dashboard · Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;
