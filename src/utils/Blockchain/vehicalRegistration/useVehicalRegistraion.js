import { useCallback, useState } from "react";
import { writeContractAddress } from "../writeContractInstance";
import useWalletConnection from "../useWalletConnection";

const useVehicalRegistration = () => {
  let [walletAddress, setWalletAddress] = useState();
  walletAddress = setWalletAddress(localStorage.getItem("walletAddress"));
  const registerVehicle = useCallback(
    async (
      vehicalOwner,
      username,
      number,
      vehicalImageHash,
      adharCardImageHash,
      RC_ImageHash
    ) => {
      try {
        const tx = await contract.vehicalRegistration(
          walletAddress,
          vehicalOwner,
          username,
          number,
          vehicalImageHash,
          adharCardImageHash,
          RC_ImageHash
        );
        console.log("Transaction sent: ", tx.hash);

        const receipt = await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction mined: ", receipt);
      } catch (error) {
        console.error("Error registering vehicle: ", error);
      }
    },
    [walletAddress]
  ); // Add walletAddress as a dependency

  return { registerVehicle };
};

export { useVehicalRegistration };
