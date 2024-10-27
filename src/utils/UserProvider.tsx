import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Define the type for the context value
interface UserContextType {
  token: string;
  vehicles: any;
  longiLat: GeoLocation;
  destiLongiLat: GeoLocation;
  directionsResponse: google.maps.DirectionsResult | null;
  distance: string;
  duration: string;
  setDistance: (distance: string) => void;
  setDuration: (duration: string) => void;
  setDirectionsResponse: (
    directionsResponse: google.maps.DirectionsResult | null
  ) => void;
  setdestiLongiLat: (geoLocation: GeoLocation) => void;
  setlongiLat: (geoLocation: GeoLocation) => void;
  setVehicles: (vehicles: any) => void;
  fetchVehicles: () => void;
  updateToken: (newToken: string) => void;
  userData: any;
  setUserData: (newUserData: any) => void;
}

interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
  label: string;
}

// Create the context with the defined type
export const UserContext = createContext<UserContextType>({
  token: "",
  longiLat: { latitude: null, longitude: null, label: "" },
  destiLongiLat: { latitude: null, longitude: null, label: "" },
  directionsResponse: null,
  distance: "",
  duration: "",
  setDistance: () => {},
  setDuration: () => {},
  setDirectionsResponse: () => {},
  setdestiLongiLat: () => {},
  setlongiLat: () => {},
  vehicles: [],
  setVehicles: () => {},
  fetchVehicles: () => {},
  updateToken: () => {},
  userData: null,
  setUserData: () => {},
});

// Define the props type for the UserProvider
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Function to validate the token
  const backendUrl = process.env.NEXT_PUBLIC_URL;
  async function validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.get(`${backendUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // If the request is successful and returns data, the token is valid
      if (response.data) {
        setUserData(response.data.data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // If there's an error (e.g., network error, server error), the token is invalid
      console.error("Error validating token:", error);
      return false;
    }
  }

  // State for token
  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      validateToken(tokenFromStorage).then((isValid) => {
        if (isValid) {
          setToken(tokenFromStorage);
        } else {
          localStorage.removeItem("token");
          setToken("");
        }
      });
    }
  }, []);

  //fetch vehicle data
  const [vehicles, setVehicles] = useState([]);
  console.log(vehicles);

  // const userDataString = localStorage.getItem("userData");
  // let username = "";
  //   if (userDataString !== null) {
  //       const userData = JSON.parse(userDataString);
  //        username = userData.username;
  //   } else {
  //     console.error("User data not found in localStorage");
  //   }

  //getting long, lat
  const [longiLat, setlongiLat] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    label: "",
  });

  const [destiLongiLat, setdestiLongiLat] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    label: "",
  });

  //route calculation

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  async function fetchVehicles() {
    try {
      const response = await axios.get(`${backendUrl}/vehicle/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }

  // Function to update token
  const updateToken = (newToken: string) => {
    setToken(newToken);
  };
  const updateUserData = (newUserData: any) => {
    setUserData(newUserData);
  };

  // Provide the token and updateToken function to the context
  return (
    <UserContext.Provider
      value={{
        token,
        updateToken,
        userData,
        setUserData,
        vehicles,
        setVehicles,
        fetchVehicles,
        longiLat,
        setlongiLat,
        destiLongiLat,
        setdestiLongiLat,
        directionsResponse,
        distance,
        duration,
        setDistance,
        setDuration,
        setDirectionsResponse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// PropTypes are not needed in TypeScript
