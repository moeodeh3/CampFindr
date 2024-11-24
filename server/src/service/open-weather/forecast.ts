import { getResourceLocationDetails } from '../resource/resourceLegend.js';
import { useOpenMeteoForecastQuery } from './query.js';
import { DailyWeatherForecast } from './types.js';

export async function getForecastFromResourceLocationId(
  resourceLocationId: number
): Promise<DailyWeatherForecast[] | null> {
  try {
    const resource = await getResourceLocationDetails(resourceLocationId);

    if (
      !resource ||
      !resource.position ||
      !resource.position.latitude ||
      !resource.position.longitude
    ) {
      return null;
    }

    return await useOpenMeteoForecastQuery(resource.position);
  } catch (error) {
    console.error(
      'Error fetching resource location details or forecast:',
      error
    );
    return null;
  }
}
