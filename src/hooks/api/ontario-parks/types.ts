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
}
