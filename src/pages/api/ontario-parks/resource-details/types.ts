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