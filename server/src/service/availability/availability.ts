import crypto from 'crypto';
import { getMapLegendDetails } from '../mapLegend/mapLegend.js';
import {
  AvailabilityResponse,
  AvailabilityInput,
  OntarioAvailabilityResponse,
} from './types';
import {
  getMapIdsFromMapLinkAvailabilities,
  getMapIdsFromResourceAvailabilities,
} from './utils.js';
import { useAvailabilityQuery } from './query.js';

// in-memory cache
const cacheData: { [key: string]: OntarioAvailabilityResponse } = {};
const cacheTimestamp: { [key: string]: number } = {};

// we have a cache time of 2 minutes
const CACHE_DURATION = 1000 * 60 * 2;

function generateCacheKey(queryParams: AvailabilityInput): string {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return crypto.createHash('md5').update(queryString).digest('hex');
}

export async function FetchAvailability(
  queryParams: AvailabilityInput
): Promise<OntarioAvailabilityResponse> {
  const cacheKey = generateCacheKey(queryParams);

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
    const data = await useAvailabilityQuery(queryParams);

    // update the cache
    cacheData[cacheKey] = data;
    cacheTimestamp[cacheKey] = now;

    return data;
  } catch (err) {
    throw new Error('Failed to fetch availability data: ' + err);
  }
}

export async function FetchAllParksAvailability(
  queryParams: AvailabilityInput
): Promise<AvailabilityResponse[]> {
  const allParksData = await FetchAvailability(queryParams);

  // we get the child map ids from the response
  const childMapIds = getMapIdsFromMapLinkAvailabilities(allParksData);

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
    .flatMap((data) => getMapIdsFromMapLinkAvailabilities(data))
    .filter((id, index, self) => self.indexOf(id) === index);

  const grandchildAvailabilityData = await Promise.all(
    grandchildMapIds.map(async (grandchildMapId) => {
      const legendDetails = await getMapLegendDetails(grandchildMapId);
      return {
        mapId: grandchildMapId,
        linksAvailable: grandchildMapIds.length,
        legendDetails,
      };
    })
  );

  return grandchildAvailabilityData;
}

export async function FetchCampgroundAvailability(
  queryParams: AvailabilityInput
): Promise<AvailabilityResponse[]> {
  const availability = await FetchAvailability(queryParams);

  const childMapIds = getMapIdsFromMapLinkAvailabilities(availability);

  // map to store mapId and linksAvailable for each campground
  const finalCampgroundIds = new Map<number, number>();
  let processingMapIds = childMapIds;

  // we loop until we find all campsites and their parent map IDs which are campgrounds
  while (processingMapIds.length > 0) {
    const availabilityData = await Promise.all(
      processingMapIds.map(async (mapId) => {
        const data = await FetchAvailability({ ...queryParams, mapId });
        return { mapId, data };
      })
    );

    const nextLevelMapIds = new Set<number>();

    for (const { mapId, data } of availabilityData) {
      const childIds = getMapIdsFromMapLinkAvailabilities(data);

      if (childIds.length === 0) {
        // if mapLinkAvailabilities is empty it means this is a campsite
        const linksAvailable = getMapIdsFromResourceAvailabilities(data).length;
        finalCampgroundIds.set(mapId, linksAvailable);
      } else {
        // if mapLinkAvailabilities is not empty we add to next level for further processing
        childIds.forEach((childId) => nextLevelMapIds.add(childId));
      }
    }

    // we update processingMapIds for the next iteration
    processingMapIds = Array.from(nextLevelMapIds);
  }

  // we fetch legend details for all collected campgrounds
  const campgroundData = await Promise.all(
    Array.from(finalCampgroundIds.entries()).map(
      async ([mapId, linksAvailable]) => ({
        mapId,
        linksAvailable,
        legendDetails: await getMapLegendDetails(mapId),
      })
    )
  );

  return campgroundData;
}
