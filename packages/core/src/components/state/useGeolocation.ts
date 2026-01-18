import { useState, useEffect } from 'react';

type GeolocationCoordinates = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

type UseGeolocationReturn = {
  loading: boolean;
  error: Error | null;
  coords: GeolocationCoordinates | null;
};

const useGeolocation = (): UseGeolocationReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLoading(false);
      },
      (err) => {
        setError(new Error(err.message));
        setLoading(false);
      },
    );
  }, []);

  return { loading, error, coords };
};

export default useGeolocation;
