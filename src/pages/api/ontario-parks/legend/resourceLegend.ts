import { ResourceLocation, ResourceLocationResponse } from "./types";

// in-memory cache
let resourceCache: Map<number, ResourceLocation> | null = null;
let resourceCacheTimestamp: number | null = null;

// cache time of 7 days
const CACHE_DURATION = 1000 * 60 * 60 * 168;

async function fetchResourceLocation(): Promise<Map<number, ResourceLocation>> {
  const now = Date.now();

  // check if the cache is still valid
  if (resourceCache && resourceCacheTimestamp && now - resourceCacheTimestamp < CACHE_DURATION) {
    return resourceCache;
  }

  // if cache is not valid, fetch new data
  try {
    const url = `https://reservations.ontarioparks.ca/api/resource-locations`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(`Failed to fetch data: ${resp.status}, details: ${errorDetails}`);
      throw new Error(`Failed to fetch data: ${resp.status}`);
    }

    const data: ResourceLocationResponse = await resp.json();

    // make the response a map with key being the resourceLocationId
    const resourceMap = new Map<number, ResourceLocation>();
    data.forEach((entry) => {
      const localizedEntry = entry.localizedValues.find(
        (val) => val.cultureName === "en-CA"
      );

      resourceMap.set(entry.resourceLocationId, {
        ...entry,
        localizedValues: [localizedEntry || entry.localizedValues[0]],
      });
    });

    // update the cache
    resourceCache = resourceMap;
    resourceCacheTimestamp = now;

    return resourceMap;
  } catch (error) {
    console.error("Error fetching resource location data:", error);
    throw new Error("Failed to fetch resource location data");
  }
}

export async function getResourceLocationDetails(
  resourceLocationId: number
): Promise<ResourceLocation | null> {
  try {
    const resourceMap = await fetchResourceLocation();
    return resourceMap.get(resourceLocationId) || null;
  } catch (error) {
    console.error("Error fetching resource location details:", error);
    return null;
  }
}
