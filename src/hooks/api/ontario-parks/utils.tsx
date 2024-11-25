import {
  AvailabilityResponse,
  ResourceEntry,
  ResourceInput,
} from '@packages/types';
import { handleJSONResponse } from '../utils';
import { AvailabilityInput } from './types';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function getOntarioParksAvailability(
  props: AvailabilityInput
): Promise<AvailabilityResponse[] | null> {
  const {
    mapId,
    bookingCategoryId,
    equipmentCategoryId,
    subEquipmentCategoryId,
    cartUid,
    cartTransactionUid,
    bookingUid,
    startDate,
    endDate,
    partySize,
    userPosition,
    maxDistance,
  } = props;

  try {
    const url = `${BASE_URL}/api/availability?${
      mapId ? `mapId=${mapId}&` : ''
    }bookingCategoryId=${bookingCategoryId}&equipmentCategoryId=${equipmentCategoryId}&subEquipmentCategoryId=${subEquipmentCategoryId}&cartUid=${cartUid}&cartTransactionUid=${cartTransactionUid}&bookingUid=${bookingUid}&startDate=${startDate}&endDate=${endDate}&partySize=${partySize}&userLatitude=${userPosition?.latitude}&userLongitude=${userPosition?.longitude}&maxDistance=${maxDistance}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleJSONResponse(resp);
  } catch (error) {
    console.error('Error fetching availability data:', error);
    return null;
  }
}

export async function getOntarioParksResourceDetails(
  props: ResourceInput
): Promise<ResourceEntry | null> {
  const { mapId } = props;

  try {
    const url = `${BASE_URL}/api/resource/${mapId}`;
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleJSONResponse(resp);
  } catch (error) {
    console.error('Error fetching resource details:', error);
    return null;
  }
}
