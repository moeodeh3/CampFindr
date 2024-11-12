// Map Legend
export interface LegendDetails {
  title: string;
  description: string;
  imageUrl: string;
}

export interface MapLegendEntry {
  title: string;
  description: string;
  resourceLocationId: number;
}

// Availibility
export interface AvailabilityResponse {
  mapId: number;
  legendDetails: LegendDetails;
}
