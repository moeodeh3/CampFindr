import { Position } from '../resource/types';
import { GoogleMapsPosition } from './types';

export async function useGoogleMapsPositionQuery(
  address: string
): Promise<GoogleMapsPosition | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `Failed to fetch data: ${resp.status}, details: ${errorDetails}`
      );
      throw new Error(`Failed to fetch data: ${resp.status}`);
    }

    const data = await resp.json();

    // we extract the position from the response
    const location = data.results[0]?.geometry.location;

    if (!location) {
      return null;
    }

    return { lat: location.lat, lng: location.lng };
  } catch (error) {
    console.error('Error during Google Maps API request:', error);
    return null;
  }
}

export async function useGoogleMapsDistanceQuery(
  origin: Position,
  destination: Position
): Promise<number | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${apiKey}`;

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorDetails = await resp.text();
      console.error(
        `Failed to fetch distance: ${resp.status}, details: ${errorDetails}`
      );
      throw new Error(`Failed to fetch distance: ${resp.status}`);
    }

    const data = await resp.json();

    // we extract the distance in meters
    const distanceInMeters =
      data.rows?.[0]?.elements?.[0]?.distance?.value || null;

    return distanceInMeters ? distanceInMeters / 1000 : null;
  } catch (error) {
    console.error('Error during Distance Matrix API request:', error);
    return null;
  }
}
