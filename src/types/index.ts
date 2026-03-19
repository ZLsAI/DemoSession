export interface HourlyForecast {
  hour: string;
  temp: number;
  humidity: number;
  condition: string;
}

export interface CityWeather {
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  hourlyForecast: HourlyForecast[];
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
