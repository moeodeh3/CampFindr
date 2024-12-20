// Map Legend
export interface LegendDetails {
  resourceLocationId: number;
  title: string;
  description: string;
  imageUrl?: string;
}

// Availibility
export interface AvailabilityResponse {
  mapId: number;
  linksAvailable?: number;
  legendDetails: LegendDetails;
}

// Resource Details

export interface ResourceInput {
  mapId: number;
}

export interface ResourceEntry {
  fullName: string;
  description: string;
  streetAddress: string;
  position?: Position;
  website: string;
  city: string;
  region: string;
  regionCode: string;
  country: string;
  phoneNumber: string;
}

export interface Position {
  latitude: number;
  longitude: number;
}
