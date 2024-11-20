import { useState, useEffect } from "react";
import { readContractInstance } from "../readContractInstance";

const useSearchVehicle = () => {
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        try {
            const vehiclesLength = await readContractInstance.getVehicleCount();
            const vehiclesArray = [];

            for (let i = 0; i < vehiclesLength; i++) {
                const vehicle = await readContractInstance.vehicles(i);
                console.log(vehicle);
                vehiclesArray.push(vehicle);
            }
            return vehiclesArray;
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const vehiclesData = await fetchVehicles();
            setVehicles(vehiclesData);
        };

        fetchData();
    }, []);

    return { vehicles, fetchVehicles };
};

export { useSearchVehicle };
