import { LegendDetails } from "@packages/types";
import { getImageURL } from "./imageUrl";
import { MapLegendEntry, MapLegendResponse } from "./types";

// in-memory cache
let legendCache: Map<number, LegendDetails> | null = null;
let cacheTimestamp: number | null = null;

// we have a cache time of 7 days
const CACHE_DURATION = 1000 * 60 * 60 * 168;

async function fetchMapLegend(): Promise<Map<number, LegendDetails>> {
  const now = Date.now();

  // we check if the cache is still valid
  if (legendCache && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    return legendCache;
  }

  // if cache is not valid, we fetch new data
  try {
    const url = `https://reservations.ontarioparks.ca/api/maps`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `Failed to fetch data: ${resp.status}, details: ${errorDetails}`
      );
      throw new Error(`Failed to fetch data: ${resp.status}`);
    }

    const data: MapLegendResponse = await resp.json();

    // make the response a map with key being the mapId and values being things we use
    const legendMap = new Map<number, LegendDetails>();
    data.forEach((entry) => {
      const localizedEntry = entry.localizedValues.find(
        (val) => val.cultureName === "en-CA"
      );

      legendMap.set(entry.mapId, {
        resourceLocationId: entry.resourceLocationId,
        title: localizedEntry?.title,
        description: localizedEntry?.description,
      });
    });

    // update the cache
    legendCache = legendMap;
    cacheTimestamp = now;

    return legendMap;
  } catch (error) {
    console.error("Error fetching map legend data:", error);
    throw new Error("Failed to fetch map legend data");
  }
}

export async function getMapLegendDetails(
  mapId: number
): Promise<LegendDetails | null> {
  try {
    const legendMap = await fetchMapLegend();
    const legendDetails = legendMap.get(mapId);

    if (legendDetails) {
      const imageUrl = await getImageURL(legendDetails.resourceLocationId);

      return {
        resourceLocationId: legendDetails.resourceLocationId,
        title: legendDetails.title,
        description: legendDetails.description,
        imageUrl: imageUrl,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching map legend details:", error);
    return null;
  }
}
