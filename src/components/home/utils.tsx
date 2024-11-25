import { AvailabilityInput } from '../../hooks/api/ontario-parks/types';
import { DateTime } from 'luxon';

export type DropdownOption = 'Where' | 'Check in' | 'Check out' | 'Who';
export type KmDistanceOption =
  | 'None'
  | '200 kms'
  | '400 kms'
  | '600 kms'
  | '800 kms';
export type PartySizeOption = '1 guest' | '2 guests' | '3 guests' | '4 guests';

export const KM_DISTANCE_MAP: Record<KmDistanceOption, number | null> = {
  None: null,
  '200 kms': 200,
  '400 kms': 400,
  '600 kms': 600,
  '800 kms': 800,
};

export const PARTY_SIZE_MAP = {
  '1 guest': 1,
  '2 guests': 2,
  '3 guests': 3,
  '4 guests': 4,
};

export function getKmDistanceValue(option: KmDistanceOption): number | null {
  return KM_DISTANCE_MAP[option];
}

export function getPartySizeValue(option: PartySizeOption): number | null {
  return PARTY_SIZE_MAP[option];
}

export function getOptions<T extends Record<string, any>>(
  enumObj: T
): (keyof T)[] {
  return Object.keys(enumObj) as (keyof T)[];
}

export function formatAvailabilityInput(
  startDate: Date | null,
  endDate: Date | null,
  partySize: PartySizeOption | null,
  kmDistance: KmDistanceOption | null
): AvailabilityInput {
  if (!startDate || !endDate || !partySize || !kmDistance) {
    return null;
  }

  const formattedStartDate =
    DateTime.fromJSDate(startDate).toFormat('yyyy-MM-dd');
  const formattedEndDate = DateTime.fromJSDate(endDate).toFormat('yyyy-MM-dd');

  return {
    bookingCategoryId: 0,
    equipmentCategoryId: -32768,
    subEquipmentCategoryId: -32768,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    partySize: getPartySizeValue(partySize),
    maxDistance: getKmDistanceValue(kmDistance),
    cartUid: 'uid123',
    cartTransactionUid: 'trans123',
    bookingUid: 'booking123',
  };
}
