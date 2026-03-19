import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { getCityData } from '../data/weatherData';
import { useTheme } from '../context/ThemeContext';

const CityDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const city = name ? getCityData(name) : undefined;

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <span className="text-6xl mb-4">🔍</span>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          City Not Found
        </h2>
        <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          We don't have weather data for "{name}".
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const chartData = city.hourlyForecast;

  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className={`mb-6 flex items-center gap-2 text-sm font-medium transition-colors ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        ← Back to Dashboard
      </button>

      {/* City Header */}
      <div
        className={`rounded-2xl p-6 mb-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{city.icon}</span>
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {city.name}
                </h1>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {city.country} &bull; {city.condition}
                </p>
              </div>
            </div>
            <p className={`text-6xl font-thin mt-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {city.temperature}°C
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Feels Like', value: `${city.feelsLike}°C`, icon: '🌡️' },
              { label: 'Humidity', value: `${city.humidity}%`, icon: '💧' },
              { label: 'Wind Speed', value: `${city.windSpeed} km/h`, icon: '💨' },
              { label: 'High / Low', value: `${city.high}° / ${city.low}°`, icon: '📊' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl p-3 min-w-[120px] ${
                  isDark ? 'bg-slate-700' : 'bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{stat.icon}</span>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {stat.label}
                  </p>
                </div>
                <p className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Temperature Chart */}
      <div
        className={`rounded-2xl p-6 mb-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          🌡️ Hourly Temperature Forecast
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="hour"
              tick={{ fill: textColor, fontSize: 11 }}
              interval={2}
            />
            <YAxis
              tick={{ fill: textColor, fontSize: 11 }}
              domain={['auto', 'auto']}
              unit="°"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '8px',
                color: isDark ? '#e2e8f0' : '#1e293b',
              }}
              formatter={(value: number) => [`${value}°C`, 'Temperature']}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#0ea5e9"
              strokeWidth={2}
              fill="url(#tempGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#0ea5e9' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity Chart */}
      <div
        className={`rounded-2xl p-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          💧 Hourly Humidity Forecast
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="hour"
              tick={{ fill: textColor, fontSize: 11 }}
              interval={2}
            />
            <YAxis
              tick={{ fill: textColor, fontSize: 11 }}
              domain={[40, 100]}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '8px',
                color: isDark ? '#e2e8f0' : '#1e293b',
              }}
              formatter={(value: number) => [`${value}%`, 'Humidity']}
            />
            <Legend
              wrapperStyle={{ color: textColor, fontSize: '12px' }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Table */}
      <div
        className={`mt-6 rounded-2xl p-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          📋 Hourly Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                <th className="text-left py-2 pr-4">Time</th>
                <th className="text-left py-2 pr-4">Condition</th>
                <th className="text-right py-2 pr-4">Temp</th>
                <th className="text-right py-2">Humidity</th>
              </tr>
            </thead>
            <tbody>
              {city.hourlyForecast.map((h, i) => (
                <tr
                  key={h.hour}
                  className={`border-t transition-colors ${
                    isDark
                      ? 'border-slate-700 hover:bg-slate-700 text-slate-300'
                      : 'border-slate-50 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <td className="py-2 pr-4 font-mono">{h.hour}</td>
                  <td className="py-2 pr-4">{h.condition}</td>
                  <td className="py-2 pr-4 text-right font-semibold">{h.temp}°C</td>
                  <td className="py-2 text-right">{h.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;
