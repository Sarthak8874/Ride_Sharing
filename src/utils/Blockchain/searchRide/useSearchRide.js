import { useState, useEffect } from "react";
import { readContractInstance } from "../readContractInstance";

const useSearchRide = () => {
  const [Rides, setRides] = useState([]);

  const searchRide = async () => {
    try {
      const ridesLength = await readContractInstance.getRidesCount();
      const ridesArray = [];

      for (let i = 0; i < ridesLength; i++) {
        const ride = await readContractInstance.rides(i);
        console.log("Ride at index", i, ":", ride);
        ridesArray.push(ride);
      }
      return ridesArray;
    } catch (error) {
      console.error("Error fetching rides:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const ridesData = await searchRide();
      setRides(ridesData);
    };

    fetchData();
  }, []);

  return { Rides, searchRide };
};

export { useSearchRide };
