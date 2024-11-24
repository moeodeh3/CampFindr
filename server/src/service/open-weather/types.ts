export interface WeatherForecastResponse {
  daily: {
    time: string[]; // Dates (e.g., "2023-11-23")
    temperature_2m_max: number[]; // Max temperatures
    temperature_2m_min: number[]; // Min temperatures
    precipitation_sum: number[]; // Total precipitation
    weather_code: number[]; // WMO weather codes
  };
}

export interface DailyWeatherForecast {
  date: string; // Date for the forecast
  maxTemp: number; // Maximum temperature
  minTemp: number; // Minimum temperature
  precipitation: number; // Total precipitation (mm)
  weatherCode: number; // WMO weather code for the day
}
