import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api';
import { UserContext } from '@/utils/UserProvider';
import { m } from 'framer-motion';

// Define the styles for the map container
const containerStyle = {
  width: '90%',
  height: '500px'
};

// Define the center coordinates for the map
// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

interface MyComponentProps {}

// Define the functional component with TypeScript
const MapComponent: React.FC<MyComponentProps> = () => {
  const { longiLat} =React.useContext(UserContext);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

  useEffect(() => {
    if (longiLat && map) {
        map.panTo({ lat: longiLat.latitude!, lng: longiLat.longitude! });
        setCenter({ lat: longiLat.latitude!, lng: longiLat.longitude! });

    }
  }, [longiLat]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}` // Don't forget to replace YOUR_API_KEY with your actual API key
  });

  const [map, setMap] = useState<google.maps.Map | null>(null); // Explicitly type the state

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
        <MarkerF
         position={{ lat: longiLat.latitude!, lng: longiLat.longitude! }}
        />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>;
};

export default React.memo(MapComponent);