import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}

const Map: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    // Function to get the user's current position
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            setGeoLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          // Error callback
          (error) => {
            console.error('Error getting geolocation:', error);
            // Handle error gracefully, e.g., by showing a message to the user
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Handle no support for geolocation
      }
    };

    // Call the function to get location when the component mounts
    getLocation();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div>
      <div>Latitude: {geoLocation.latitude}</div>
      <div>Longitude: {geoLocation.longitude}</div>
      {/* Your map component */}
    </div>
  );
};

export default Map;
