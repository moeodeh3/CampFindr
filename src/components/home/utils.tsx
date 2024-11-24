import { AvailabilityInput } from '../../hooks/api/ontario-parks/types';
import { DateTime } from 'luxon';

export type DropdownOption = 'Where' | 'Check in' | 'Check out' | 'Who';
export type DrivingDistanceOption =
  | '1 hour'
  | '2 hours'
  | '3 hours'
  | '4+ hours';
export type PartySizeOption = '1 guest' | '2 guests' | '3 guests' | '4 guests';

export function formatAvailabilityInput(
  startDate: Date | null,
  endDate: Date | null,
  partySize: PartySizeOption | ''
): AvailabilityInput {
  if (!startDate || !endDate) {
    return null;
  }

  const partySizeNumber = partySize ? parseInt(partySize) : 1;

  const formattedStartDate =
    DateTime.fromJSDate(startDate).toFormat('yyyy-MM-dd');
  const formattedEndDate = DateTime.fromJSDate(endDate).toFormat('yyyy-MM-dd');

  return {
    bookingCategoryId: 0,
    equipmentCategoryId: -32768,
    subEquipmentCategoryId: -32768,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    partySize: partySizeNumber,
    cartUid: 'uid123',
    cartTransactionUid: 'trans123',
    bookingUid: 'booking123',
  };
}
