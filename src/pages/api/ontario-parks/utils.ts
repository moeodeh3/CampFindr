export interface OntarioAvailabilityResponse {
  mapId: number;
  mapAvailabilities: number[];
  resourceAvailabilities: Record<string, any>;
  mapLinkAvailabilities: MapLinkAvailabilities;
}

export interface MapLinkAvailabilities {
  [mapId: string]: number[];
}

export interface MapLegendEntry {
  title: string;
  description: string;
  resourceLocationId: number;
}

export const getQueryParamAsString = (
  param: string | string[] | undefined,
  defaultValue: string
): string => (Array.isArray(param) ? param[0] : param || defaultValue);

export const getChildMapIdsFromData = (
  data: OntarioAvailabilityResponse
): number[] => {
  return data.mapLinkAvailabilities
    ? Object.keys(data.mapLinkAvailabilities)
        .filter((id) =>
          data.mapLinkAvailabilities[id].every((val: number) => val === 0)
        )
        .map(Number)
    : [];
};
