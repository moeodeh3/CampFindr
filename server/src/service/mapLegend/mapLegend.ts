import { LegendDetails, MapLegendEntry, MapLegendResponse } from './types';
import { getImageURL } from '../imageUrl/imageUrl.js';
import { useMapLegendQuery } from './query.js';

// in-memory map for legend data
let legendMap: Map<number, LegendDetails> = new Map();

export async function fetchMapLegend(): Promise<void> {
  try {
    const data = await useMapLegendQuery();

    // make the response a map with key being the mapId and values being the info we use
    const updatedLegendMap: Map<number, LegendDetails> = new Map();
    data.forEach((entry: MapLegendEntry) => {
      const localizedEntry = entry.localizedValues.find(
        (val) => val.cultureName === 'en-CA'
      );

      updatedLegendMap.set(entry.mapId, {
        resourceLocationId: entry.resourceLocationId,
        title: localizedEntry?.title ?? '',
        description: localizedEntry?.description ?? '',
      });
    });

    // update the in-memory map
    legendMap = updatedLegendMap;
    console.log('Map legend data updated successfully.');
  } catch (error) {
    console.error('Error fetching map legend data:', error);
    throw new Error('Failed to fetch map legend data');
  }
}

export async function getMapLegendDetails(
  mapId: number
): Promise<LegendDetails | null> {
  try {
    const legendDetails = legendMap.get(mapId);

    if (legendDetails) {
      const imageUrl = await getImageURL(legendDetails.resourceLocationId);

      return {
        resourceLocationId: legendDetails.resourceLocationId,
        title: legendDetails.title,
        description: legendDetails.description,
        imageUrl: imageUrl ?? '',
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching map legend details:', error);
    return null;
  }
}
