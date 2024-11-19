import { ResourceEntry, ResourceLocationResponse } from './types';
import { useResourceLocationQuery } from './query.js';

// in-memory cache
let resourceMap: Map<number, ResourceEntry> = new Map();

export async function fetchResourceLocations(): Promise<void> {
  try {
    const data = await useResourceLocationQuery();

    // create a new map to store only the fields we care about
    const updatedResourceMap = new Map<number, ResourceEntry>();
    data.forEach((entry) => {
      const localizedEntry = entry.localizedValues.find(
        (val) => val.cultureName === 'en-CA'
      );

      updatedResourceMap.set(entry.resourceLocationId, {
        fullName: localizedEntry?.fullName ?? '',
        description: localizedEntry?.description ?? '',
        streetAddress: localizedEntry?.streetAddress ?? '',
        website: localizedEntry?.website ?? '',
        city: localizedEntry?.city ?? '',
        region: entry.region ?? '',
        regionCode: entry.regionCode,
        country: entry.country ?? '',
        phoneNumber: entry.phoneNumber,
      });
    });

    // update the in-memory map
    resourceMap = updatedResourceMap;
    console.log('Resource location data updated successfully.');
  } catch (error) {
    console.error('Error fetching resource location data:', error);
    throw new Error('Failed to fetch resource location data');
  }
}

export async function getResourceLocationDetails(
  resourceLocationId: number
): Promise<ResourceEntry | null> {
  try {
    return resourceMap.get(resourceLocationId) || null;
  } catch (error) {
    console.error('Error fetching resource location details:', error);
    return null;
  }
}
