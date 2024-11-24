import { Position } from '../resource/types';
import { DailyWeatherForecast, WeatherForecastResponse } from './types';

export async function useOpenMeteoForecastQuery(
  position: Position
): Promise<DailyWeatherForecast[] | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`;

  const resp = await fetch(url);

  if (!resp.ok) {
    const errorDetails = await resp.text();
    console.error(
      `Failed to fetch data: ${resp.status}, details: ${errorDetails}`
    );
    throw new Error(`Failed to fetch data: ${resp.status}`);
  }

  const data = (await resp.json()) as WeatherForecastResponse;

  return data.daily.time.map((_, index) => ({
    date: data.daily.time[index],
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    precipitation: data.daily.precipitation_sum[index],
    weatherCode: data.daily.weather_code[index],
  }));
}
