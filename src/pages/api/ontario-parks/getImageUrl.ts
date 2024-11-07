import { NextApiRequest, NextApiResponse } from "next";

// in-memory cache
let imageCache: Map<number, string> | null = null;
let imageCacheTimestamp: number | null = null;

// we have a cache time of 7 days
const CACHE_DURATION = 1000 * 60 * 60 * 168;

export async function fetchImageUrl(mapId: number): Promise<string | null> {
  const now = Date.now();

  if (!imageCache) {
    imageCache = new Map<number, string>();
  }

  // we check if the cache is still valid
  if (
    imageCache.has(mapId) &&
    imageCacheTimestamp &&
    now - imageCacheTimestamp < CACHE_DURATION
  ) {
    return imageCache.get(mapId) || null;
  }

  // if cache is not valid, we fetch new data
  try {
    const url = `https://reservations.ontarioparks.ca/api/photo/resourcelocation?resourceLocationId=${mapId}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `Failed to fetch image URL: ${resp.status}, details: ${errorDetails}`
      );
      throw new Error(`Failed to fetch image URL: ${resp.status}`);
    }

    const imageUrl = await resp.text();

    // update the cache
    imageCache.set(mapId, imageUrl);
    imageCacheTimestamp = now;

    return imageUrl;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    throw new Error("Failed to fetch image URL");
  }
}
