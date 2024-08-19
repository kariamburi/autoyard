import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

const Geolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // const googleMapKey = process.env.GOOGLEAPIKEY;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBti8wo3gFt3cUXfe2peKbbJgzkSPnZtRk`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch address");
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              setLocation({
                latitude,
                longitude,
                address: data.results[0].formatted_address,
              });
            } else {
              throw new Error("No address found for the provided location");
            }
          } catch (error) {
            // setError(error);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return { location, error };
};

export default Geolocation;
