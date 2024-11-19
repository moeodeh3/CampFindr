import { FetchAvailabilityInput, OntarioAvailabilityResponse } from './types';

export async function useAvailabilityQuery(
  url: string,
  queryParams: FetchAvailabilityInput
): Promise<OntarioAvailabilityResponse> {
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

  return (await resp.json()) as OntarioAvailabilityResponse;
}
