import { Position } from '../resource/types';
import { useGoogleMapsPositionQuery } from './query.js';

export async function getPositionFromAddress(
  streetAddress: string,
  city: string,
  region: string,
  regionCode: string,
  country: string
): Promise<Position | null> {
  try {
    const fullAddress = `${streetAddress}, ${city}, ${region}, ${regionCode}, ${country}`;

    const position = await useGoogleMapsPositionQuery(fullAddress);

    if (position) {
      return { latitude: position.lat, longitude: position.lng };
    }

    return null;
  } catch (err) {
    console.error('Error fetching position:', err);
    return null;
  }
}
