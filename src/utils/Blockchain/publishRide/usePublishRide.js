import { ethers } from "ethers";
import { writeContractInstance } from "../writeContractInstance";

const usePublishRide = () => {
  const address = localStorage.getItem("walletAddress");

  const publishRide = async (
    from,
    to,
    pickDate,
    passengers,
    vehicle,
    pickUpTime,
    dropTime,
    costPerPassenger
  ) => {
    try {
      // Ensure the wallet is connected
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum provider is not available.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Address:", address);
      console.log("Contract Instance:", writeContractInstance);

      // Get the provider and signer
      const infuraProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await infuraProvider.getSigner();

      // Update the contract instance with the new signer
      const contractWithSigner = writeContractInstance.connect(signer);

      // Use default values for parameters
      const publisher = address; // Wallet address as the publisher
      const fromCity = from || "CityA"; // Default from city
      const toCity = to || "CityB"; // Default to city
      const rideDate =
        pickDate || new Date("2024-10-02T19:00:00.000Z").toISOString(); // Default ride date
      const totalPassengers = passengers || 3; // Default number of passengers
      const rideType = vehicle || "Economy"; // Default ride type
      const pickUp =
        pickUpTime || new Date("2024-10-02T18:00:00.000Z").toISOString(); // Default pick-up time
      const drop =
        dropTime || new Date("2024-10-02T20:00:00.000Z").toISOString(); // Default drop-off time
      const passengerCost = costPerPassenger || 100; // Default passenger cost

      // Log the values to verify
      console.log("Publisher:", publisher);
      console.log("From City:", fromCity);
      console.log("To City:", toCity);
      console.log("Ride Date:", rideDate);
      console.log("Passengers:", totalPassengers);
      console.log("Ride Type:", rideType);
      console.log("Pick Up Time:", pickUp);
      console.log("Drop Time:", drop);
      console.log("Passenger Cost:", passengerCost);

      const gasPrice = await infuraProvider.send("eth_gasPrice", []);
      const gasLimit = await contractWithSigner.publishRide.estimateGas(
        publisher,
        fromCity,
        toCity,
        rideDate,
        totalPassengers,
        rideType,
        pickUp,
        drop,
        passengerCost
      );

      // Call the publishRide function on the contract
      const transaction = await contractWithSigner.publishRide(
        publisher,
        fromCity,
        toCity,
        rideDate,
        totalPassengers,
        rideType,
        pickUp,
        drop,
        passengerCost,
        {
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        }
      );

      await transaction.wait();
      console.log("Ride published successfully.");
    } catch (error) {
      console.error("Error publishing ride:", error);
      if (error.code === "CALL_EXCEPTION") {
        console.error("Transaction reverted. Reason:", error.reason);
      }
    }
  };

  return { publishRide };
};

export { usePublishRide };
