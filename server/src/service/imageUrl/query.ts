export async function useImageUrlQuery(mapId: number): Promise<string> {
  const url = `https://reservations.ontarioparks.ca/api/photo/resourcelocation?resourceLocationId=${mapId}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    const errorDetails = await resp.text();
    console.error(
      `Failed to fetch image URL: ${resp.status}, details: ${errorDetails}`
    );
    throw new Error(`Failed to fetch image URL: ${resp.status}`);
  }

  return await resp.text();
}
