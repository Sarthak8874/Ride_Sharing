import React, { useState, useEffect } from "react";
import axios from "axios";

interface Prediction {
  description: string;
}
interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}
const Map: React.FC = () => {
  const [input, setInput] = useState<string>(""); // State to hold user input
  const [suggestions, setSuggestions] = useState<Prediction[]>([]); // State to hold suggestions

  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGeoLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []); 

  useEffect(() => {
    if (input.trim() !== "") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_DB_MAP_URL}?input=${input}&location=${geoLocation.latitude}-${geoLocation.longitude}&radius=5&country=in&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}`,
        )
        .then((res) => {
          if (
            res.data &&
            res.data.predictions &&
            res.data.predictions.length > 0
          ) {
            setSuggestions(res.data.predictions);
          } else {
            setSuggestions([]);
            console.error("Invalid or unexpected response format");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  }, [input]); // Run this effect whenever input changes

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter location..."
      />
      <ul>
        {suggestions.map((place, index) => (
          <li key={index} onClick={()=>{
            setInput(place.description)
          }}>{place.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
