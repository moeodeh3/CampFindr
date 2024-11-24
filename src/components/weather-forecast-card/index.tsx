import { DateTime } from 'luxon';
import { DailyWeatherForecast } from 'src/hooks/api/open-meteo/types';
import { FontAwesomeIcon } from '../font-awesome-icon';
import { colors } from 'src/design/constant';
import { getOrdinal, getWeatherIcon } from './utils';

interface WeatherForecastCardProps {
  checkInDate: string;
  checkOutDate: string;
  weatherForecast: DailyWeatherForecast[];
}

export const WeatherForecastCard = (props: WeatherForecastCardProps) => {
  const { checkInDate, checkOutDate, weatherForecast } = props;

  const checkIn = DateTime.fromISO(checkInDate);
  const checkOut = DateTime.fromISO(checkOutDate);

  // we separate forecasts within range and remaining forecasts
  const inRangeForecast =
    weatherForecast?.filter((forecast) => {
      const forecastDate = DateTime.fromISO(forecast.date);
      return forecastDate >= checkIn && forecastDate <= checkOut;
    }) ?? [];

  const remainingForecast =
    weatherForecast?.filter((forecast) => {
      const forecastDate = DateTime.fromISO(forecast.date);
      return forecastDate < checkIn || forecastDate > checkOut;
    }) ?? [];

  // combine to ensure exactly 4 days even if range is smaller
  const displayForecast = [...inRangeForecast, ...remainingForecast].slice(
    0,
    4
  );

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/3 h-full">
      {displayForecast.map((forecast, index) => (
        <WeatherDayCard forecast={forecast} key={index} />
      ))}
    </div>
  );
};

interface WeatherDayCardProps {
  forecast: DailyWeatherForecast;
}

const WeatherDayCard = ({ forecast }: WeatherDayCardProps) => {
  const forecastDate = DateTime.fromISO(forecast.date);
  const ordinal = getOrdinal(forecastDate.day);

  return (
    <div className="flex flex-col w-full items-center justify-between p-2 border rounded-lg bg-blue-100 shadow">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-text-primary text-sm font-semibold">
          {forecastDate.toLocaleString({
            weekday: 'short',
          })}
        </p>
        <p className="text-text-primary text-xss font-light">
          {forecastDate.toLocaleString({
            day: 'numeric',
          })}
          <span className="text-text-primary text-xss font-light">
            {ordinal}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center py-2">
        <FontAwesomeIcon
          icon={getWeatherIcon(forecast.weatherCode)}
          size="xl"
          color={colors.textSecondary}
        />
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <p className="text-text-primary text-xs font-bold">
          {forecast.maxTemp}°
        </p>
        <p className="text-text-primary text-xss font-light">
          {forecast.minTemp}°
        </p>
      </div>
    </div>
  );
};
