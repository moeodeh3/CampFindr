import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { getMapLegendDetails } from "../legend/mapLegend";
import { getChildMapIdsFromData, getQueryParamAsString } from "./utils";
import { OntarioAvailabilityResponse } from "./types";

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

export interface FetchAvailabilityInput {
  mapId: number; // The main park or map identifier, defaults to all parks ID (-2147483464)
  bookingCategoryId: string; // Default category for campsite reservations
  equipmentCategoryId: string; // Category of equipment (e.g., tent), default: -32768 (single tent)
  subEquipmentCategoryId: string; // Subcategory of equipment, default: -32768 (e.g., single tent type)
  cartUid: string; // Unique identifier for a cart session, default: generated UUID
  cartTransactionUid: string; // Unique identifier for cart transactions, default: generated UUID
  bookingUid: string; // Unique identifier for booking session, default: generated UUID
  startDate: string; // Booking start date, default: today
  endDate: string; // Booking end date, default: one day after the start date
  getDailyAvailability: string; // Whether to fetch daily availability, default: "false"
  isReserving: string; // Specifies reservation status, default: "true"
  filterData: string; // Additional filtering criteria, default: "[]" for no additional filters
  boatLength: string; // Boat length filter, default: "null" for no filter
  boatDraft: string; // Boat draft filter, default: "null" for no filter
  boatWidth: string; // Boat width filter, default: "null" for no filter
  partySize: string; // Number of guests, default: "2"
  numEquipment: string; // Number of equipment items, default: "null"
  seed: string; // Seed value for caching and uniqueness, default: current timestamp
}

async function FetchAvailability(
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

  // if cache is not valid, we fetch new data
  try {
    const queryString = new URLSearchParams(queryParams as any).toString();
    const fullUrl = `${url}?${queryString}`;

    const resp = await fetch(fullUrl);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `Failed to fetch data, status: ${resp.status}, details: ${errorDetails}`
      );
      throw new Error(`Failed to fetch data: ${resp.status}`);
    }

    const data: OntarioAvailabilityResponse = await resp.json();

    // update the cache
    cacheData[cacheKey] = data;
    cacheTimestamp[cacheKey] = now;

    return data;
  } catch (error) {
    console.error("error fetching availability data:", error);
    throw new Error("Failed to fetch availability data");
  }
}

async function FetchAllParksAvailability(queryParams: FetchAvailabilityInput) {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    mapId,
    bookingCategoryId,
    equipmentCategoryId,
    subEquipmentCategoryId,
    cartUid,
    cartTransactionUid,
    bookingUid,
    startDate,
    endDate,
    partySize,
  } = req.query;

  const queryParams: FetchAvailabilityInput = {
    mapId: mapId ? Number(mapId) : -2147483464, // default to all parks map ID if not provided
    bookingCategoryId: getQueryParamAsString(bookingCategoryId, "0"),
    equipmentCategoryId: getQueryParamAsString(equipmentCategoryId, "-32768"), // single tent
    subEquipmentCategoryId: getQueryParamAsString(
      subEquipmentCategoryId,
      "-32768"
    ),
    cartUid: getQueryParamAsString(cartUid, crypto.randomUUID()),
    cartTransactionUid: getQueryParamAsString(
      cartTransactionUid,
      crypto.randomUUID()
    ),
    bookingUid: getQueryParamAsString(bookingUid, crypto.randomUUID()),
    startDate: getQueryParamAsString(
      startDate,
      new Date().toISOString().split("T")[0]
    ),
    endDate: getQueryParamAsString(
      endDate,
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0]
    ),
    getDailyAvailability: "false",
    isReserving: "true",
    filterData: `[]`,
    boatLength: "null",
    boatDraft: "null",
    boatWidth: "null",
    partySize: getQueryParamAsString(partySize, "2"),
    numEquipment: "null",
    seed: generateSeed(),
  };

  if (!mapId) {
    // initial search for all parks
    const data = await FetchAllParksAvailability(queryParams);
    return res.status(200).json(data);
  } else {
    // search one level lower

    const data = await FetchAvailability(queryParams);
    const legendDetails = await getMapLegendDetails(Number(mapId));
    return res.status(200).json({ mapId, legendDetails });
  }
}
