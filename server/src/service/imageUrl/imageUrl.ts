import { useImageUrlQuery } from './query.js';

// in-memory cache
let imageCache: Map<number, string> = new Map();
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
    const imageUrl = await useImageUrlQuery(mapId);

    // update the cache
    imageCache.set(mapId, imageUrl);
    imageCacheTimestamp = now;

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    throw new Error('Failed to fetch image URL');
  }
}

export async function getImageURL(mapId: number): Promise<string | null> {
  try {
    const url = await fetchImageUrl(mapId);
    return url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
}
