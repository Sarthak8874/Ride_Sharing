"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/inputA";
import { DatePickerDemo } from "./Datepicker";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}
interface Prediction {
  description: string;
}

const page = () => {
  const [source, setSource] = React.useState<string>("");
  const [souceTime, setSouceTime] = useState(null);
  const [destinationTime, setDestinantionTime] = useState(null);
  const [destination, setDestination] = React.useState<string>("");
  const [sourcesuggestions, setsourceSuggestions] = React.useState<
    Prediction[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    Prediction[]
  >([]);

  const [passengers, setPassengers] = React.useState<string>();
  const [geoLocation, setGeoLocation] = React.useState<GeoLocation>({
    latitude: null,
    longitude: null,
  });
  const sourceInputRef = React.useRef<HTMLInputElement>(null);
  const destinationInputRef = React.useRef<HTMLInputElement>(null);
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

  const handleDestinationSuggestion = (input: string) => {
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
          setDestinationSuggestions(res.data.predictions);
        } else {
          console.error("Invalid or unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching destination data:", error);
      });
  };

  // Handle clicks outside the destination suggestion dropdown
  const handleDestinationClickOutside = (event: any) => {
    if (
      destinationInputRef.current &&
      !destinationInputRef.current.contains(event.target)
    ) {
      setDestinationSuggestions([]);
    }
  };

  // Add event listener for handling clicks outside the destination suggestion dropdown
  useEffect(() => {
    document.addEventListener("click", handleDestinationClickOutside);
    return () =>
      document.removeEventListener("click", handleDestinationClickOutside);
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
    if (
      sourceInputRef.current &&
      !sourceInputRef.current.contains(event.target)
    ) {
      setsourceSuggestions([]);
    }
  };

  useEffect(() => {
    // Add event listener on document mount
    document.addEventListener("click", handleClickOutside);

    // Cleanup function on unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  console.log(destinationSuggestions,'d');
  return (
    <>
      {/* <div className="flex h-full"> */}
      <div className="h-[93.8vh] bg-[#11184b] ">
        <div className="flex w-full justify-around pt-[20px]">
          <h2 className="font-bold text-[30px]  text-[#FFF]">Publish a Ride</h2>
        </div>
        <div className="flex flex-col gap-[20px] px-[80px] py-[40px]  justify-between items-center">
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
            onChange={(e) => {
              setDestination(e?.target?.value);
              handleDestinationSuggestion(e?.target?.value);
            }}
            ref={destinationInputRef}
            placeholder="To"
          />
          <div className="absolute">
            <ul>
              {destinationSuggestions.map((place, index) => (
                <li
                  className=""
                  key={index}
                  onClick={() => {
                    setDestination(place.description);
                    setDestinationSuggestions([]);
                  }}
                >
                  {place.description}
                </li>
              ))}
            </ul>
          </div>
          <DatePickerDemo />
          <Input
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(e?.target?.value)}
            placeholder="Passengers"
          />
          <DatePicker
            className={cn(
              `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
        focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
         disabled:cursor-not-allowed disabled:opacity-50
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
         group-hover/input:shadow-none transition duration-400
         `
            )}
            placeholderText="Pick-Up Time"
            selected={souceTime}
            onChange={(time: any) => setSouceTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
          />
          <DatePicker
            placeholderText="Drop Time"
            className={cn(
              `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
        focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
         disabled:cursor-not-allowed disabled:opacity-50
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
         group-hover/input:shadow-none transition duration-400
         `
            )}
            selected={destinationTime}
            onChange={(time: any) => setDestinantionTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
          />
          <Button variant="outline">Publish</Button>
        </div>
      </div>
    </>
  );
};

export default page;
