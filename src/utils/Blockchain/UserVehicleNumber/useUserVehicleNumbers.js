import { useEffect, useState } from "react";
import { readContractInstance } from "../readContractInstance";

export const useUserVehicleNumbers = (username) => {
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVehicleNumbers = async () => {
    if (!username) return; // Guard clause to prevent fetching if username is not provided

    try {
      setLoading(true);
      setError(null);
      const vehicles = await readContractInstance.getUserVehicles(username);
      console.log("Fetched vehicles: ", vehicles);

      if (Array.isArray(vehicles)) {
        const numbers = vehicles.map((vehicle) => vehicle.number);
        console.log("number", numbers);
        setVehicleNumbers(numbers);
      } else {
        console.error("Data format error: vehicles is not an array", vehicles);
        setVehicleNumbers([]); // Set empty array if data is invalid
      }
    } catch (err) {
      console.error("Error fetching user vehicle numbers:", err);
      setError("Failed to fetch vehicle numbers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleNumbers();
  }, [username]); // Change dependency to username

  return { vehicleNumbers, loading, error, fetchVehicleNumbers };
};
