import { NextApiRequest, NextApiResponse } from 'next';
import { MapLegendResponse } from '../../../hooks/api/ontario-parks/types';
import { formatMapResponse } from './utils';

// in-memory cache
let cacheData: MapLegendResponse | null = null;
let cacheTimestamp: number | null = null;

// we have a cache time of 12 hours, as this legend will not update very often
const CACHE_DURATION = 1000 * 60 * 60 * 12 ; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mapId } = req.query;

  // make sure mapId is provided
  if (!mapId) {
    return res.status(400).json({ error: "missing mapId parameter" });
  }

  const now = Date.now();

  // we check if the cache is still valid
  if (cacheData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    const mapData = cacheData.find((entry) => entry.mapId === Number(mapId));
    if (mapData) {
      return res.status(200).json(mapData);
    } else {
      return res.status(404).json({ error: "Map not found" });
    }
  }

  // if cache is not valid, we fetch new data
  try {
    const url = `https://reservations.ontarioparks.ca/api/maps`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(`failed to fetch data, status: ${resp.status}, details: ${errorDetails}`);
      return res.status(resp.status).json({ error: `failed to fetch data: ${resp.status}` });
    }

    const data: MapLegendResponse = await resp.json();

    // update the cache
    cacheData = data;
    cacheTimestamp = now;

    // search for the mapId in the legend
    const mapData = data.find((entry) => entry.mapId === Number(mapId));
    if (mapData) {
      return res.status(200).json(formatMapResponse(mapData));
    } else {
      return res.status(404).json({ error: "map not found" });
    }
  } catch (error) {
    console.error('Error fetching map legend data:', error);
    return res.status(500).json({ error: 'Failed to fetch map legend data' });
  }
}
