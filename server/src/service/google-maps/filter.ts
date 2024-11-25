import { AvailabilityResponse } from '../availability/types';
import { getResourceLocationId } from '../mapLegend/mapLegend.js';
import { getResourceLocationDetails } from '../resource/resourceLegend.js';
import { Position } from '../resource/types';
import { useGoogleMapsDistanceQuery } from './query.js';

export async function filterAvailabilityByDistance(
  userPosition: Position,
  data: AvailabilityResponse[],
  maxDistance: number
): Promise<AvailabilityResponse[]> {
  const filteredData: AvailabilityResponse[] = [];

  for (const item of data) {
    const resourceLocationId = await getResourceLocationId(item.mapId);
    if (resourceLocationId) {
      const resourceDetails =
        await getResourceLocationDetails(resourceLocationId);
      if (resourceDetails && resourceDetails.position) {
        // use the google maps Distance matrix api to calculate the distance
        const distance = await useGoogleMapsDistanceQuery(
          userPosition,
          resourceDetails.position
        );

        // we filter based on the maxdistance
        if (distance !== null && distance <= maxDistance) {
          filteredData.push(item);
        }
      }
    }
  }

  return filteredData;
}
