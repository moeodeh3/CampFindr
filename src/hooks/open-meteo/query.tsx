import { useQuery } from '@tanstack/react-query';
import { DailyWeatherForecast } from '../api/open-meteo/types';
import {
  Loadable,
  loadDataFromQuery,
  mapLoadable,
  QueryOptions,
} from '../api/query';
import { getOpenMeteoForecast } from '../api/open-meteo/utils';
import { ResourceInput } from '@packages/types';

export function useOpenMeteoForecastQuery(
  props: ResourceInput,
  options: QueryOptions
): Loadable<DailyWeatherForecast[] | null> {
  const availabilityQuery = useQuery({
    queryKey: ['openMeteoForecastQuery', props],
    queryFn: async () => getOpenMeteoForecast(props),
    ...options,
    enabled: options.enabled,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const availabilityRoute = loadDataFromQuery(availabilityQuery);

  return mapLoadable(availabilityRoute)(
    (data): DailyWeatherForecast[] | null => data
  );
}
