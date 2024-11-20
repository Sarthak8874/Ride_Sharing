import { writeContractInstance } from "../writeContractInstance";
import { writeContractInstance2 } from "./ethSendingContract/writeContract2";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const useBookNow = () => {
  // State for managing booking status, errors, and loading
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState();

  // Hardcoded receiver address
  const receiverAddress = "0xCDAC6a4c7a69f74abb02E5b1EB642602b2070dbc";

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
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Connect both contracts with the signer
      const contractWithSigner1 = writeContractInstance.connect(signer); // Booking contract
      const contractWithSigner2 = writeContractInstance2.connect(signer); // Ether transfer contract

      // Execute the bookRide function in the booking contract
      const gasPrice = await provider.send("eth_gasPrice", []);
      const gasLimit1 = await contractWithSigner1.bookRide.estimateGas(
        _userId,
        _driver,
        _fromCity,
        _toCity,
        _passengerCost,
        _bookedSeats,
        _date
      );

      const bookingTransaction = await contractWithSigner1.bookRide(
        _userId,
        _driver,
        _fromCity,
        _toCity,
        _passengerCost,
        _bookedSeats,
        _date,
        {
          gasLimit: gasLimit1,
          gasPrice: gasPrice,
        }
      );

      await bookingTransaction.wait(); // Wait for the booking transaction to complete

      // Execute the Ether transfer using the second contract
      const etherValue = ethers.parseEther("0.00005"); // Amount to send (0.00005 ETH)
      const gasLimit2 = await contractWithSigner2.transferFunds.estimateGas(
        receiverAddress,
        { value: etherValue }
      );

      const transferTransaction = await contractWithSigner2.transferFunds(
        receiverAddress,
        {
          value: etherValue, // Ether to send
          gasLimit: gasLimit2,
          gasPrice: gasPrice,
        }
      );

      await transferTransaction.wait(); // Wait for the transfer transaction to complete

      setSuccess(true);
      toast.success("Booking and Ether transfer successful!");
    } catch (error) {
      console.error("Error during booking or Ether transfer:", error);
      setError(error.message || "Operation failed.");
      toast.error(error.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return { bookNow, isLoading, isSuccess, error };
};

export { useBookNow };
