import { MapLegendResponse } from './types';

export async function useMapLegendQuery(): Promise<MapLegendResponse> {
  const url = `https://reservations.ontarioparks.ca/api/maps`;

  const resp = await fetch(url);

  if (!resp.ok) {
    const errorDetails = await resp.text();
    console.error(
      `Failed to fetch data: ${resp.status}, details: ${errorDetails}`
    );
    throw new Error(`Failed to fetch data: ${resp.status}`);
  }

  return (await resp.json()) as MapLegendResponse;
}
