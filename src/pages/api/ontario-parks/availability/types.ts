export interface OntarioAvailabilityResponse {
  mapId: number;
  mapAvailabilities: number[];
  resourceAvailabilities: Record<string, any>;
  mapLinkAvailabilities: MapLinkAvailabilities;
}

export interface MapLinkAvailabilities {
  [mapId: string]: number[];
}
