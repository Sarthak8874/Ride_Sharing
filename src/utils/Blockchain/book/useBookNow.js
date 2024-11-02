import { writeContractInstance } from "../writeContractInstance";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const useBookNow = () => {
  // State for managing booking status, errors, and loading
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState();

  const bookNow = async (
    _userId,
    _driver,
    _fromCity,
    _toCity,
    _passengerCost,
    _bookedSeats,
    _date
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Check for Ethereum provider
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum provider is not available.");
        setError("Ethereum provider is not available.");
        return;
      }

      // Request account access from user
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      const infuraProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await infuraProvider.getSigner();
      const contractWithSigner = writeContractInstance.connect(signer);

      // Execute the bookRide function in the contract

      const gasPrice = await infuraProvider.send("eth_gasPrice", []);

      console.log(
        _userId,
        _driver,
        _fromCity,
        _toCity,
        _passengerCost,
        _bookedSeats,
        _date
      );
      const gasLimit = await contractWithSigner.bookRide.estimateGas(
        _userId,
        _driver,
        _fromCity,
        _toCity,
        _passengerCost,
        _bookedSeats,
        _date
      );

      const transaction = await contractWithSigner.bookRide(
        _userId,
        _driver,
        _fromCity,
        _toCity,
        _passengerCost,
        _bookedSeats,
        _date,
        {
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        }
      );
      await transaction.wait();

      setSuccess(true);
      toast.success("Booking successful!");
    } catch (error) {
      // Handle errors
      console.error("Error during booking:", error);
      setError(error.message || "Booking failed.");
      toast.error(error.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return { bookNow, isLoading, isSuccess, error };
};

export { useBookNow };
