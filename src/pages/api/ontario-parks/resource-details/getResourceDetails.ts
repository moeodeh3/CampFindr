import { ResourceEntry, ResourceInput } from "@packages/types";
import { ResourceLocationResponse } from "./types";
import { NextApiRequest, NextApiResponse } from "next";

// in-memory cache
let resourceCache: Map<number, ResourceEntry> | null = null;
let resourceCacheTimestamp: number | null = null;

// cache time of 7 days
const CACHE_DURATION = 1000 * 60 * 60 * 168;

async function fetchResourceLocation(): Promise<Map<number, ResourceEntry>> {
  const now = Date.now();

  // check if the cache is still valid
  if (
    resourceCache &&
    resourceCacheTimestamp &&
    now - resourceCacheTimestamp < CACHE_DURATION
  ) {
    return resourceCache;
  }

  // if cache is not valid, fetch new data
  try {
    const url = `https://reservations.ontarioparks.ca/api/resourceLocation`;
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `Failed to fetch data: ${resp.status}, details: ${errorDetails}`
      );
      throw new Error(`Failed to fetch data: ${resp.status}`);
    }

    const data: ResourceLocationResponse = await resp.json();

    // we create a new map to store only the fields we care about
    const resourceMap = new Map<number, ResourceEntry>();
    data.forEach((entry) => {
      const localizedEntry = entry.localizedValues.find(
        (val) => val.cultureName === "en-CA"
      );

      resourceMap.set(entry.resourceLocationId, {
        fullName: localizedEntry?.fullName,
        description: localizedEntry?.description,
        streetAddress: localizedEntry?.streetAddress,
        website: localizedEntry?.website,
        city: localizedEntry?.city,
        region: entry.region,
        regionCode: entry.regionCode,
        country: entry.country,
        phoneNumber: entry.phoneNumber,
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
): Promise<ResourceEntry | null> {
  try {
    const resourceMap = await fetchResourceLocation();
    return resourceMap.get(resourceLocationId) || null;
  } catch (error) {
    console.error("Error fetching resource location details:", error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { resourceLocationId } = req.query;

  // validate and parse mapId
  if (!resourceLocationId || Array.isArray(resourceLocationId)) {
    return res.status(400).json({ error: "Invalid or missing mapId parameter" });
  }

  const resourceLocationIdNumber = Number(resourceLocationId);

  try {
    console.log("the resource location id is: ", resourceLocationId)
    const data = await getResourceLocationDetails(resourceLocationIdNumber);
    if (!data) {
      return res.status(404).json({ error: "Resource location not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({ error: "Failed to fetch resource location data" });
  }
}
