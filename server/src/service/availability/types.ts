import { LegendDetails } from '../mapLegend/types';

export interface AvailabilityResponse {
  mapId: number;
  linksAvailable?: number;
  legendDetails: LegendDetails | null;
}

export interface OntarioAvailabilityResponse {
  mapId: number;
  mapAvailabilities: number[];
  resourceAvailabilities: Resource;
  mapLinkAvailabilities: MapLinkAvailabilities;
}

export interface MapLinkAvailabilities {
  [mapId: string]: number[];
}

export interface Resource {
  availability: number;
  remainingQuota: number | null;
}

export interface FetchAvailabilityInput {
  mapId: number; // The main park or map identifier, defaults to all parks ID (-2147483464)
  bookingCategoryId: string; // Default category for campsite reservations
  equipmentCategoryId: string; // Category of equipment (e.g., tent), default: -32768 (single tent)
  subEquipmentCategoryId: string; // Subcategory of equipment, default: -32768 (e.g., single tent type)
  cartUid: string; // Unique identifier for a cart session, default: generated UUID
  cartTransactionUid: string; // Unique identifier for cart transactions, default: generated UUID
  bookingUid: string; // Unique identifier for booking session, default: generated UUID
  startDate: string; // Booking start date, default: today
  endDate: string; // Booking end date, default: one day after the start date
  getDailyAvailability: string; // Whether to fetch daily availability, default: "false"
  isReserving: string; // Specifies reservation status, default: "true"
  filterData: string; // Additional filtering criteria, default: "[]" for no additional filters
  boatLength: string; // Boat length filter, default: "null" for no filter
  boatDraft: string; // Boat draft filter, default: "null" for no filter
  boatWidth: string; // Boat width filter, default: "null" for no filter
  partySize: string; // Number of guests, default: "2"
  numEquipment: string; // Number of equipment items, default: "null"
  seed: string; // Seed value for caching and uniqueness, default: current timestamp
}
