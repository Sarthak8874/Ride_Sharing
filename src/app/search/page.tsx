"use client";

import React, { use, useContext, useEffect } from "react";
import { Input } from "@/components/ui/inputA";
import { DatePickerDemo } from "../../components/Datepicker";
import { Button } from "@/components/ui/button";
import axios from "axios";
import withAuth from "@/components/withAuth";

import BookComponent from "./BookComponent";
import { UserContext } from "@/utils/UserProvider";
import MapComponent from "@/components/MapComponent";

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
  const [sourcesuggestions, setsourceSuggestions] = React.useState<
    Prediction[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = React.useState<
    Prediction[]
  >([]);
  const [date, setDate] = React.useState();
  const [passengers, setPassengers] = React.useState<string>();
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
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
                                      {destinationSuggestions.map(
                                          (place, index) => (
                                              <li
                                                  className="text-sm p-2.5 cursor-pointer hover:bg-gray-100"
                                                  key={index}
                                                  onClick={() => {
                                                      setDestination(
                                                          place.description
                                                      );
                                                      setDestinationId(
                                                          place.place_id
                                                      );
                                                      setDestinationSuggestions(
                                                          []
                                                      );
                                                  }}
                                              >
                                                  {place.description}
                                              </li>
                                          )
                                      )}
                                  </ul>
                              </div>
                          )}
                      </ul>
                  </div>
              </div>
              <DatePickerDemo  setDate2={setDate} />
              <Input
                  type="number"
                  value={passengers}
                  onChange={(e) => setPassengers(e?.target?.value)}
                  placeholder="Passengers"
              />
              <Button
                  onClick={() => {
                      handleOnSearch();
                  }}
                  variant="outline"
              >
                  Search
              </Button>

              <Button
                  onClick={() => {
                      calculateRoute();
                      setShowMap(true);
                  }}
                  variant="outline"
              >
                  Calculate Route
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
                      <span className="underline text-2xl font-semibold">
                          {distance}
                      </span>
                  </h1>
                  <h1 className="text-xl">
                      Expected Duration:{" "}
                      <span className="underline text-2xl font-semibold">
                          {duration}
                      </span>
                  </h1>
              </div>
          </div>
          {rides.map((ride) => (
              <BookComponent key={ride._id} ride={ride} />
          ))}

          {showMap && (
              <div className="w-screen my-16 flex justify-center items-center ">
                  <MapComponent />
              </div>
          )}
      </>
  );
};

export default withAuth(page);
