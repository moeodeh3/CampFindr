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
  legendDetails: LegendDetails;
}

// Resource Details

export interface ResourceInput {
  resourceLocationId: number;
}

export interface ResourceEntry {
  fullName: string;
  description: string;
  streetAddress: string;
  website: string;
  city: string;
  region: string;
  regionCode: string;
  country: string;
  phoneNumber: string;
}
