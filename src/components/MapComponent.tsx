// import React, { useCallback, useEffect, useState } from 'react';
// import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api';
// import { UserContext } from '@/utils/UserProvider';
// import { m } from 'framer-motion';

// // Define the styles for the map container
// const containerStyle = {
//   width: '90%',
//   height: '500px'
// };

// // Define the center coordinates for the map
// // const center = {
// //   lat: -3.745,
// //   lng: -38.523
// // };

// interface MyComponentProps {}

// // Define the functional component with TypeScript
// const MapComponent: React.FC<MyComponentProps> = () => {
//   const { longiLat,destiLongiLat} =React.useContext(UserContext);

//   const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

//   useEffect(() => {
//     if (longiLat && map) {
//         map.panTo({ lat: longiLat.latitude!, lng: longiLat.longitude! });
//         setCenter({ lat: longiLat.latitude!, lng: longiLat.longitude! });

//     }
//   }, [longiLat]);

  

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}` 
//   });

//   const [map, setMap] = useState<google.maps.Map | null>(null); 

//   const onLoad = useCallback((map: google.maps.Map) => {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = useCallback((map: google.maps.Map) => {
//     setMap(null);
//   }, []);

//   return isLoaded? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//         <MarkerF
//          position={{ lat: longiLat.latitude!, lng: longiLat.longitude! }}
//         />

//         { destiLongiLat && (  <MarkerF position={{ lat: destiLongiLat.latitude!, lng: destiLongiLat.longitude! }} />) }
//       <></>
//     </GoogleMap>
//   ) : <></>;
// };

// export default React.memo(MapComponent);

import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { UserContext } from '@/utils/UserProvider';

// Define the styles for the map container
const containerStyle = {
  width: '90%',
  height: '500px'
};

interface MyComponentProps {}

const MapComponent: React.FC<MyComponentProps> = () => {
  const { longiLat, destiLongiLat,directionsResponse } = React.useContext(UserContext);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}` 
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && longiLat) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(longiLat.latitude!, longiLat.longitude!));
      if (destiLongiLat) {
        bounds.extend(new window.google.maps.LatLng(destiLongiLat.latitude!, destiLongiLat.longitude!));
      }
      map.fitBounds(bounds);
    }
  }, [map, longiLat, destiLongiLat]);

  return isLoaded ? (
    <div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
            <Marker position={{ lat: longiLat.latitude!, lng: longiLat.longitude! }} />
            {destiLongiLat && <Marker position={{ lat: destiLongiLat.latitude!, lng: destiLongiLat.longitude! }} />}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
        </GoogleMap>
    </div>
    
  ) : <></>;
};

export default React.memo(MapComponent);

