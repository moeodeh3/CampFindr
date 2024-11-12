// Map Legend
export type MapLegendResponse = MapLegendEntry[];

export interface MapLegendEntry {
  isOrganizationRoot: boolean;
  mapId: number;
  versionId: number;
  versionDate: string;
  mapType: number;
  isDisabled: boolean;
  xDimension: number;
  yDimension: number;
  localizedValues: LocalizedValue[];
  resourceLocationId: number;
  mapResources: MapResource[];
  mapAccessPointResources: any[];
  mapLegendItems: any[];
  mapLinks: any[];
  mapLabels: any[];
  parentMaps: number[];
  mapGlobalStyleLegends: any[];
  parentTransactionLocationId: number;
  defaultResultsView: number;
  transactionLocationTypes: any[];
}

export interface LocalizedValue {
  cultureName: string;
  title: string;
  description: string;
  mapImageUid: string;
  mapImageFormat: number;
}

export interface MapResource {
  resourceId: number;
  iconType: number;
  localizationPoint: LocalizationPoint;
  xCoordinate: number;
  yCoordinate: number;
  registrationActions: number[];
  transactionLocationTypes: number[];
}

export interface LocalizationPoint {
  justification: number;
  xCoordinate: number;
  yCoordinate: number;
  rValue: number;
  gValue: number;
  bValue: number;
}

// Resource Legend
export interface ResourceLocationResponse extends Array<ResourceLocation> {}

export interface ResourceLocation {
  resourceLocationId: number;
  timeZoneOffset: number;
  similarExperiences: SimilarExperience[];
  localizedValues: LocalizedValue[];
  email: string;
  faxNumber: string;
  gpsCoordinates: string;
  googleAddress: any; 
  region: string | null;
  regionCode: string;
  country: string | null;
  phoneNumber: string;
  transactionLocationId: number;
  selfCheckInInstructions: any[]; 
  attributes: any[]; 
  resourceCategoryIds: number[];
}

export interface SimilarExperience {
  bookingCategoryId: number;
  resourceLocationId: number;
  order: number;
  localizedValues: SimilarExperienceLocalizedValue[];
}

export interface SimilarExperienceLocalizedValue {
  cultureName: string;
  description: string;
}

export interface LocalizedValue {
  cultureName: string;
  shortName: string;
  fullName: string;
  description: string;
  drivingDirections: string;
  streetAddress: string;
  city: string;
  website: string;
  confirmationLetterPolicies: any[];
}