import crypto from 'crypto';
import { getMapLegendDetails } from '../mapLegend/mapLegend.js';
import { FetchAvailabilityInput, OntarioAvailabilityResponse } from './types';
import { getChildMapIdsFromData } from './utils.js';
import { useAvailabilityQuery } from './query.js';

// in-memory cache
let cacheData: { [key: string]: any } = {};
let cacheTimestamp: { [key: string]: number } = {};

// we have a cache time of 2 minutes
const CACHE_DURATION = 1000 * 60 * 2;

function generateCacheKey(url: string, queryParams: any): string {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&');
  return crypto.createHash('md5').update(`${url}?${queryString}`).digest('hex');
}

export async function FetchAvailability(
  queryParams: FetchAvailabilityInput
): Promise<OntarioAvailabilityResponse> {
  const url = `https://reservations.ontarioparks.ca/api/availability/map`;

  const cacheKey = generateCacheKey(url, queryParams);

  // we check if the cache is still valid
  const now = Date.now();
  if (
    cacheData[cacheKey] &&
    cacheTimestamp[cacheKey] &&
    now - cacheTimestamp[cacheKey] < CACHE_DURATION
  ) {
    return cacheData[cacheKey];
  }

  // if cache is not valid, query new data
  try {
    const data = await useAvailabilityQuery(url, queryParams);

    // update the cache
    cacheData[cacheKey] = data;
    cacheTimestamp[cacheKey] = now;

    return data;
  } catch (error) {
    console.error('Error fetching availability data:', error);
    throw new Error('Failed to fetch availability data');
  }
}

export async function FetchAllParksAvailability(
  queryParams: FetchAvailabilityInput
) {
  const allParksData = await FetchAvailability(queryParams);

  // ensure that mapLinkAvailabilities exists
  const childMapIds = getChildMapIdsFromData(allParksData);

  const grandchildData = await Promise.all(
    childMapIds.map(async (childMapId) => {
      const childAvailability = await FetchAvailability({
        ...queryParams,
        mapId: childMapId,
      });
      return childAvailability;
    })
  );

  const grandchildMapIds = grandchildData
    .flatMap((data) => getChildMapIdsFromData(data))
    .filter((id, index, self) => self.indexOf(id) === index);

  const grandchildAvailabilityData = await Promise.all(
    grandchildMapIds.map(async (grandchildMapId) => {
      const legendDetails = await getMapLegendDetails(grandchildMapId);
      return {
        mapId: grandchildMapId,
        legendDetails,
      };
    })
  );

  return grandchildAvailabilityData;
}
