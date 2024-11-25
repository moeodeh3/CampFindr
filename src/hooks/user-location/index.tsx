import { Position } from '@packages/types';
import { useState } from 'react';

export const useUserLocation = () => {
  const [location, setLocation] = useState<Position | null>(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return { location, error, getLocation };
};
