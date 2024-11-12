export interface AvailabilityInput {
  bookingCategoryId: number;
  equipmentCategoryId: number;
  subEquipmentCategoryId: number;
  cartUid: string;
  cartTransactionUid: string;
  bookingUid: string;
  startDate: string;
  endDate: string;
  partySize: number;
}
