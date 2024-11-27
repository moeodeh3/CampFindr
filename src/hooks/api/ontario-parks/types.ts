import { Position } from '@packages/types';

export interface AvailabilityInput {
  mapId?: number;
  bookingCategoryId: number;
  equipmentCategoryId: number;
  subEquipmentCategoryId: number;
  cartUid: string;
  cartTransactionUid: string;
  bookingUid: string;
  startDate: string;
  endDate: string;
  partySize: number;
  maxDistance?: number;
  userPosition?: Position;
  filters?: FilterOptions;
}

interface FilterOptions {
  restrictions?: string[];
  serviceType?: string | null;
  doubleSite?: string | null;
  pullThrough?: string | null;
  siteShade?: string | null;
  barrierFree?: string | null;
}
