import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { UserContext } from "@/utils/UserProvider";

// Define the styles for the map container

interface MyComponentProps {
  width: string;
  height: string;
}

const MapComponent: React.FC<MyComponentProps> = ({ width, height }) => {
  const { longiLat, destiLongiLat, directionsResponse } =
    React.useContext(UserContext);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

  const containerStyle = {
    width: `${width}`,
    height: `${height}`,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}`,
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
      bounds.extend(
        new window.google.maps.LatLng(longiLat.latitude!, longiLat.longitude!)
      );
      if (destiLongiLat) {
        bounds.extend(
          new window.google.maps.LatLng(
            destiLongiLat.latitude!,
            destiLongiLat.longitude!
          )
        );
      }
      map.fitBounds(bounds);
    }
  }, [map, longiLat, destiLongiLat]);

  return isLoaded ? (
    <div className="relative ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {longiLat && (
          <Marker
            position={{ lat: longiLat.latitude!, lng: longiLat.longitude! }}
          />
        )}
        {destiLongiLat && (
          <Marker
            position={{
              lat: destiLongiLat.latitude!,
              lng: destiLongiLat.longitude!,
            }}
          />
        )}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MapComponent);
