import { ResourceInput } from '@packages/types';
import { DailyWeatherForecast } from './types';
import { handleJSONResponse } from '../utils';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function getOpenMeteoForecast(
  props: ResourceInput
): Promise<DailyWeatherForecast[] | null> {
  const { mapId } = props;

  try {
    const url = `${BASE_URL}/api/weather/${mapId}`;
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleJSONResponse(resp);
  } catch (error) {
    console.error('Error fetching resource details:', error);
    return null;
  }
}
