"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/inputA";
import { DatePickerDemo } from "./Datepicker";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Map from "./map";
interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}
interface Prediction {
  description: string;
}

const page = () => {
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [sourcesuggestions, setsourceSuggestions] = React.useState<
    Prediction[]
  >([]);
  const [passengers, setPassengers] = React.useState<string>();
  const [geoLocation, setGeoLocation] = React.useState<GeoLocation>({
    latitude: null,
    longitude: null,
  });
  const sourceInputRef = React.useRef<HTMLInputElement>(null);
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

  const Suggestion = (input: string, setSuggestions: any) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_DB_MAP_URL}?input=${input}&location=${geoLocation.latitude}-${geoLocation.longitude}&radius=5&country=in&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}`
      )
      .then((res) => {
        if (
          res.data &&
          res.data.predictions &&
          res.data.predictions.length > 0
        ) {
          setSuggestions(res.data.predictions);
        } else {
          console.error("Invalid or unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleSourceSuggestion = (e: string) => {
    Suggestion(e, setsourceSuggestions);
  };
    // Handle clicks outside the source suggestion dropdown
    const handleClickOutside = (event: any) => {
      if (sourceInputRef.current && !sourceInputRef.current.contains(event.target)) {
        setsourceSuggestions([]);
      }
    };
  
    useEffect(() => {
      // Add event listener on document mount
      document.addEventListener("click", handleClickOutside);
  
      // Cleanup function on unmount
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);
  return (
    <>
      {/* <div className="flex h-full"> */}
      <div className="flex bg-[#11184b] px-[80px] py-[40px] flex-row justify-between items-center">
        <div className="relative">
          <Input
            value={source}
            ref={sourceInputRef}
            onChange={(e) => {
              setSource(e?.target?.value);
              handleSourceSuggestion(e?.target?.value);
            }}
            placeholder="From"
          />
          <div className="absolute">
            <ul>
              {sourcesuggestions.map((place, index) => (
                <li
                  className=""
                  key={index}
                  onClick={() => {
                    setSource(place.description);
                    setsourceSuggestions([]);
                  }}
                >
                  {place.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Input
          value={destination}
          onChange={(e) => setDestination(e?.target?.value)}
          placeholder="to"
        />
        <DatePickerDemo />
        <Input
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e?.target?.value)}
          placeholder="Passengers"
        />
        <Button variant="outline">Search</Button>
      </div>
      {/* <Map /> */}
      {/* </div> */}
    </>
  );
};

export default page;
