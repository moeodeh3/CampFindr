import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

// in-memory cache
let cacheData: { [key: string]: any } = {};
let cacheTimestamp: { [key: string]: number } = {};

// we have a cache time of 2 minute
const CACHE_DURATION = 1000 * 60 * 2;

// we generate a seed everytime or else the request would fail
function generateSeed(): string {
  return new Date().toISOString();
}

// we generate a unique cache key based on query parameters
function generateCacheKey(url: string, queryParams: any): string {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");
  return crypto.createHash("md5").update(`${url}?${queryString}`).digest("hex");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    mapId,
    bookingCategoryId,
    equipmentCategoryId,
    subEquipmentCategoryId,
    startDate,
    endDate,
    cartUid,
    cartTransactionUid,
    bookingUid,
    partySize,
    seed,
  } = req.query;

  const url = `https://reservations.ontarioparks.ca/api/availability/map`;
  const queryParams = {
    mapId,
    bookingCategoryId,
    equipmentCategoryId,
    subEquipmentCategoryId,
    cartUid,
    cartTransactionUid,
    bookingUid,
    startDate,
    endDate,
    getDailyAvailability: "false",
    isReserving: "true",
    filterData: "[]",
    boatLength: "null",
    boatDraft: "null",
    boatWidth: "null",
    partySize,
    numEquipment: "null",
    seed: generateSeed(),
  };

  const cacheKey = generateCacheKey(url, queryParams);

  // we check if the cache is still valid
  const now = Date.now();
  if (
    cacheData[cacheKey] &&
    cacheTimestamp[cacheKey] &&
    now - cacheTimestamp[cacheKey] < CACHE_DURATION
  ) {
    console.log("Serving from cache");
    return res.status(200).json(cacheData[cacheKey]);
  }

  // if cache is not valid, we fetch new data
  try {
    const queryString = new URLSearchParams(queryParams as any).toString();
    const fullUrl = `${url}?${queryString}`;

    const resp = await fetch(fullUrl);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `failed to fetch data, status: ${resp.status}, details: ${errorDetails}`
      );
      return res
        .status(resp.status)
        .json({ error: `failed to fetch data: ${resp.status}` });
    }

    const data = await resp.json();

    // update the cache
    cacheData[cacheKey] = data;
    cacheTimestamp[cacheKey] = now;

    return res.status(200).json(data);
  } catch (error) {
    console.error("error fetching availability data:", error);
    return res.status(500).json({ error: "failed to fetch availability data" });
  }
}
