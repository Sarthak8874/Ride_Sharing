import { useState, useEffect } from "react";
import { readContractInstance } from "../readContractInstance";

const useSearchRide = () => {
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const ridesLength = await readContractInstance.getPublishedVehicleCount();
      for (let i = 0; i < 4; i++) {
        const book = await readContractInstance.bookedRide(i);
      }
      const ridesArray = [];
      for (let i = 0; i < ridesLength; i++) {
        const ride = await readContractInstance.publishedVehicles(i);
        console.log(ride);
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
      const ridesData = await fetchRides();
      setRides(ridesData);
    };

    fetchData();
  }, []);

  return { rides, fetchRides };
};

export { useSearchRide };
