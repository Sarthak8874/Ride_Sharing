import { ethers } from "ethers";
import { writeContractInstance } from "../writeContractInstance";
import { useEffect, useState } from "react";

const usePublishRide = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress) {
      setAddress(walletAddress);
    }
  }, []);

  const publishRide = async (
    username,
    vehicleIndex,
    rideDate,
    passengers,
    fromCity,
    toCity,
    pickUpTime,
    dropTime,
    passengerCost
  ) => {
    try {
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum provider is not available.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Address:", address);
      console.log("Contract Instance:", writeContractInstance);

      const infuraProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await infuraProvider.getSigner();
      const contractWithSigner = writeContractInstance.connect(signer);

      const formattedRideDate = new Date(rideDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedPickUpTime = new Date(pickUpTime)
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "");

      const formattedDropTime = new Date(dropTime)
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "");

      const gasPrice = await infuraProvider.send("eth_gasPrice", []);
      const gasLimit = await contractWithSigner.publishRide.estimateGas(
        username,
        vehicleIndex,
        formattedRideDate,
        passengers,
        fromCity,
        toCity,
        formattedPickUpTime,
        formattedDropTime,
        passengerCost
      );

      const transaction = await contractWithSigner.publishRide(
        username,
        vehicleIndex,
        formattedRideDate,
        passengers,
        fromCity,
        toCity,
        formattedPickUpTime,
        formattedDropTime,
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
