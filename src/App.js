import React, { useState } from 'react';

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    marginTop: '0',
    background: 'linear-gradient(90deg, #64b5f6, #e1bee7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    marginBottom: '36px',
    marginTop: '0',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '32px',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  button: {
    padding: '14px 22px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(135deg, #4fc3f7, #9c27b0)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.15s, opacity 0.15s',
    whiteSpace: 'nowrap',
  },
  errorBox: {
    background: 'rgba(244, 67, 54, 0.2)',
    border: '1px solid rgba(244, 67, 54, 0.4)',
    borderRadius: '12px',
    padding: '14px 18px',
    marginBottom: '20px',
    color: '#ff8a80',
    fontSize: '14px',
    textAlign: 'center',
  },
  weatherBox: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '28px',
    textAlign: 'center',
  },
  cityName: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '4px',
    color: '#e3f2fd',
  },
  countryName: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '20px',
  },
  tempRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '12px',
  },
  weatherIcon: {
    fontSize: '56px',
    lineHeight: 1,
  },
  temperature: {
    fontSize: '64px',
    fontWeight: '700',
    lineHeight: 1,
    background: 'linear-gradient(180deg, #ffffff, #90caf9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  condition: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '24px',
    textTransform: 'capitalize',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '12px',
    padding: '16px',
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#e3f2fd',
  },
  loadingText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    padding: '20px 0',
  },
};

const CONDITION_ICONS = {
  sunny: '☀️',
  clear: '🌙',
  'partly cloudy': '⛅',
  cloudy: '☁️',
  overcast: '☁️',
  mist: '🌫️',
  fog: '🌫️',
  rain: '🌧️',
  drizzle: '🌦️',
  snow: '❄️',
  sleet: '🌨️',
  thunder: '⛈️',
  storm: '🌩️',
  blizzard: '🌨️',
  haze: '🌫️',
  wind: '💨️',
};

function getConditionIcon(desc) {
  if (!desc) return '🌡️';
  const lower = desc.toLowerCase();
  for (const [key, icon] of Object.entries(CONDITION_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return '🌡️';
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(trimmed)}?format=j1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      const current = data.current_condition[0];
      const area = data.nearest_area[0];
      const cityDisplay =
        area.areaName[0]?.value || trimmed;
      const country =
        area.country[0]?.value || '';
      const region =
        area.region[0]?.value || '';

      setWeather({
        city: cityDisplay,
        country: region ? `${region}, ${country}` : country,
        tempC: current.temp_C,
        tempF: current.temp_F,
        feelsLikeC: current.FeelsLikeC,
        humidity: current.humidity,
        windSpeed: current.windspeedKmph,
        visibility: current.visibility,
        condition: current.weatherDesc[0]?.value || 'Unknown',
      });
    } catch (err) {
      console.error(err);
      setError(
        'Could not fetch weather data. Please check the city name and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <h1 style={styles.title}>Weather Now</h1>
        <p style={styles.subtitle}>Enter a city to get the current weather</p>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. London, Tokyo, New York…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="City name"
          />
          <button
            style={styles.button}
            onClick={fetchWeather}
            disabled={loading}
            aria-label="Fetch weather"
          >
            {loading ? '…' : 'Search'}
          </button>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {loading && (
          <p style={styles.loadingText}>Fetching weather data…</p>
        )}

        {weather && !loading && (
          <div style={styles.weatherBox}>
            <div style={styles.cityName}>{weather.city}</div>
            <div style={styles.countryName}>{weather.country}</div>

            <div style={styles.tempRow}>
              <span style={styles.weatherIcon}>
                {getConditionIcon(weather.condition)}
              </span>
              <span style={styles.temperature}>{weather.tempC}°C</span>
            </div>

            <div style={styles.condition}>{weather.condition}</div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Humidity</div>
                <div style={styles.statValue}>{weather.humidity}%</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Feels Like</div>
                <div style={styles.statValue}>{weather.feelsLikeC}°C</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Wind</div>
                <div style={styles.statValue}>{weather.windSpeed} km/h</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Visibility</div>
                <div style={styles.statValue}>{weather.visibility} km</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
