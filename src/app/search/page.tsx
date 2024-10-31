"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/inputA";
import { DatePickerDemo } from "../../components/Datepicker";
import { Button } from "@/components/ui/button";
import axios from "axios";
import withAuth from "@/components/withAuth";

import BookComponent from "./BookComponent";
import { UserContext } from "@/utils/UserProvider";
import MapComponent from "@/components/MapComponent";
import Spinner from "@/components/Spinner";
import { useSearchRide } from "../../utils/Blockchain/search/useSearchPublishedRide.js";
import { useSearchVehicle } from "../../utils/Blockchain/search/useSearchVehicle";
interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}
interface Prediction {
  description: string;
  place_id: string;
}

const page = () => {
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [sourceId, setsourceId] = React.useState<string>("");
  const [destinationId, setDestinationId] = React.useState<string>("");
  const [rides, setRides] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [sourcesuggestions, setsourceSuggestions] = React.useState<
    Prediction[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = React.useState<
    Prediction[]
  >([]);
  const [date, setDate] = React.useState<string>("");
  const [passengers, setPassengers] = React.useState<string>("");
  const [geoLocation, setGeoLocation] = React.useState<GeoLocation>({
    latitude: null,
    longitude: null,
  });

  const {
    longiLat,
    destiLongiLat,
    setlongiLat,
    setDirectionsResponse,
    distance,
    duration,
    setDistance,
    setDuration,
    setdestiLongiLat,
  } = React.useContext(UserContext);

  const [showMap, setShowMap] = React.useState<boolean>(true);
  const destinationInputRef = React.useRef<HTMLInputElement>(null);
  const sourceInputRef = React.useRef<HTMLInputElement>(null);

  const { fetchRides } = useSearchRide();
  const { fetchVehicles } = useSearchVehicle();
  const [allRides, setAllRides] = React.useState<any[]>([]);
  // const [allVehicles, setVehicles] = React.useState<any[]>([]);
  const [filteredRides, setFilteredRides] = React.useState<any[]>([]); // State for filtered rides

  // const [ridesArr, setRidesArray] = React.useState<any[]>([]);
  useEffect(() => {
    const PublishedRides = async () => {
      const rides = await fetchRides();

      setAllRides(rides);
      console.log("Published Rides : ", rides);
    };
    PublishedRides();
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
    const getlongiLat = (input: string) => {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${input}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}`
        )
        .then((res) => {
          if (res?.data) {
            setlongiLat({
              latitude: res.data.result.geometry.location.lat,
              longitude: res.data.result.geometry.location.lng,
              label: res.data.result.name,
            });
          } else {
            console.error("Invalid or unexpected response format");
          }
        })
        .catch((error) => {
          console.error("Error fetching destination data:", error);
        });
    };

    const getdestiLongiLat = (input: string) => {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${input}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY}`
        )
        .then((res) => {
          if (res?.data) {
            setdestiLongiLat({
              latitude: res.data.result.geometry.location.lat,
              longitude: res.data.result.geometry.location.lng,
              label: res.data.result.name,
            });
          } else {
            console.error("Invalid or unexpected response format");
          }
        })
        .catch((error) => {
          console.error("Error fetching destination data:", error);
        });
    };

    if (sourceId) {
      getlongiLat(sourceId);
    }

    if (destinationId) {
      getdestiLongiLat(destinationId);
    }
  }, [sourceId, destinationId]);
  const { token } = useContext(UserContext);
  async function calculateRoute() {
    if (
      !sourceInputRef.current ||
      !destinationInputRef.current ||
      sourceInputRef.current.value === "" ||
      destinationInputRef.current.value === ""
    ) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: sourceInputRef.current.value,
      destination: destinationInputRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    if (
      results.routes &&
      results.routes.length > 0 &&
      results.routes[0].legs &&
      results.routes[0].legs.length > 0
    ) {
      setDistance(results.routes[0].legs[0].distance?.text || "");
      setDuration(results.routes[0].legs[0].duration?.text || "");
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setSource("");
    setDestination("");
    setlongiLat({ latitude: null, longitude: null, label: "" });
    setdestiLongiLat({ latitude: null, longitude: null, label: "" });
    if (sourceInputRef.current) {
      sourceInputRef.current.value = "";
    }
    if (destinationInputRef.current) {
      destinationInputRef.current.value = "";
    }
  }

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

  const handleOnSearch = () => {
    const filtered = allRides.filter((ride) => {
      const matchesSource = ride.fromCity === source; // Adjust property name as needed
      console.log("from city: ", ride.fromCity);
      console.log("sources: ", source);
      console.log("match source ? ", matchesSource);

      const matchesDestination = ride.toCity === destination; // Adjust property name as needed

      console.log("to City : ", ride.toCity);
      console.log("destination : ", destination);
      console.log("match Destination :", matchesDestination);
      const formattedRideDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      console.log("Formatted Date", formattedRideDate);
      const matchesDate = ride.rideDate === formattedRideDate;
      console.log("ride Date : ", ride.rideDate);
      console.log("formatted Date : ", formattedRideDate);

      console.log("matched Date ? ", matchesDate);
      const matchesPassengers =
        parseInt(ride.passengers) >= parseInt(passengers);

      console.log("passengers : ", ride.passengers);
      console.log("passengers : ", passengers);
      console.log("matchPassengers ?", matchesPassengers);

      return (
        matchesSource && matchesDestination && matchesDate && matchesPassengers
      );
    });

    setFilteredRides(filtered);
    console.log("Filter Ride :", filteredRides);

    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/search`, {
        params: {
          sourceId: sourceId,
          destinationId: destinationId,
          date: date,
          seatsRequired: passengers,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setRides(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="flex bg-[#11184b] px-[80px] py-[40px] flex-row justify-between items-center">
        <div className="relative">
          <Input
            value={source}
            ref={sourceInputRef}
            onChange={(e) => {
              setSource(e?.target?.value);
              handleSourceSuggestion(e?.target?.value);
              setlongiLat({
                latitude: null,
                longitude: null,
                label: "",
              });
              setDirectionsResponse(null);
            }}
            placeholder="From"
          />
          {sourcesuggestions.length > 0 && (
            <div className="absolute max-h-56 overflow-y-auto bg-white z-[100] rounded-md border-2">
              <ul className="divide-y divide-gray-200">
                {sourcesuggestions.map((place, index) => (
                  <li
                    className="text-sm p-2.5 cursor-pointer hover:bg-gray-100"
                    key={index}
                    onClick={() => {
                      setSource(place.description);
                      setsourceId(place.place_id);
                      setsourceSuggestions([]);
                    }}
                  >
                    {place.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <Input
            value={destination}
            onChange={(e) => {
              setDestination(e?.target?.value);
              handleDestinationSuggestion(e?.target?.value);
              setdestiLongiLat({
                latitude: null,
                longitude: null,
                label: "",
              });
              setDirectionsResponse(null);
            }}
            ref={destinationInputRef}
            placeholder="To"
          />
          <div className="absolute w-full">
            <ul>
              {destinationSuggestions.length > 0 && (
                <div className="absolute max-h-56 overflow-y-auto bg-white z-[100] rounded-md border-2">
                  <ul className="divide-y divide-gray-200">
                    {destinationSuggestions.map((place, index) => (
                      <li
                        className="text-sm p-2.5 cursor-pointer hover:bg-gray-100"
                        key={index}
                        onClick={() => {
                          setDestination(place.description);
                          setDestinationId(place.place_id);
                          setDestinationSuggestions([]);
                        }}
                      >
                        {place.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
        <DatePickerDemo setDate2={setDate} />
        <Input
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e?.target?.value)}
          placeholder="Passengers"
        />
        <Button
          onClick={() => {
            handleOnSearch();
            calculateRoute();
            setShowMap(true);
          }}
          variant="outline"
        >
          Search
        </Button>

        <Button
          onClick={() => {
            clearRoute();
          }}
          variant="outline"
        >
          Clear
        </Button>
      </div>
      <div className="flex bg-[#11184b] text-white justify-center items-center">
        <div className="w-full flex justify-evenly">
          <h1 className="text-xl">
            Distance:{" "}
            <span className="underline text-2xl font-semibold">{distance}</span>
          </h1>
          <h1 className="text-xl">
            Expected Duration:{" "}
            <span className="underline text-2xl font-semibold">{duration}</span>
          </h1>
        </div>
      </div>
      {/* <div className="w-full bg-black text-white"> */}
      {/* {filteredRides.length > 0 ? (
          filteredRides.map((ride, index) => (
            <div key={index} className="p-4 border-b border-gray-700">
              <p>
                <strong>Driver :</strong> {ride.username}
              </p>
              <p>
                <strong>Vehicle Number:</strong> {ride.vehicleNumber}
              </p>
              <p>
                <strong>From:</strong> {ride.fromCity} <strong>To:</strong>{" "}
                {ride.toCity}
              </p>
              <p>
                <strong>Date:</strong> {ride.rideDate}
              </p>
              <p>
                <strong>Pick-Up Time:</strong> {ride.pickUpTime}
              </p>
              <p>
                <strong>Drop Time:</strong> {ride.dropTime}
              </p>
              <p>
                <strong>Cost per Passenger:</strong>{" "}
                {ride.passengerCost.toString()}
              </p>
              <p>
                <strong>Passengers : </strong>
                {ride.passengers}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No rides available.
          </div>
        )}
      </div> */}

      {/* {filteredRides.length === 0 ? (
        <div className="my-10 text-center text-[30px]">No ride found</div>
      ) : (
        rides.map((ride, index) => <BookComponent key={ride._id} ride={ride} />)
      )} */}
      <div className="w-full bg-black text-white">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride, index) => (
            <BookComponent key={ride._id} ride={ride} />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No rides available.
          </div>
        )}
      </div>

      {showMap && (
        <div className="w-screen my-16 flex justify-center items-center ">
          <MapComponent width="900px" height="600px" />
        </div>
      )}
    </>
  );
};

export default page;
