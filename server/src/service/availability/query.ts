import { FetchAvailabilityInput, OntarioAvailabilityResponse } from './types';

export async function useAvailabilityQuery(
  queryParams: FetchAvailabilityInput
): Promise<OntarioAvailabilityResponse> {
  const url = `https://reservations.ontarioparks.ca/api/availability/map`;

  const formattedParams: Record<string, string> = Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => [key, String(value)])
  );

  const queryString = new URLSearchParams(formattedParams).toString();
  const fullUrl = `${url}?${queryString}`;

  const resp = await fetch(fullUrl);

  if (!resp.ok) {
    const errorDetails = await resp.text();
    console.error(
      `Failed to fetch data, status: ${resp.status}, details: ${errorDetails}`
    );
    throw new Error(`Failed to fetch data: ${resp.status}`);
  }

  return (await resp.json()) as OntarioAvailabilityResponse;
}
