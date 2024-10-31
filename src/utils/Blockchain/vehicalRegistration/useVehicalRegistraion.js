import { useCallback, useState, useEffect } from "react";
import { writeContractInstance } from "../writeContractInstance";
import { ethers } from "ethers";

const useVehicleRegistration = () => {
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    setWalletAddress(localStorage.getItem("walletAddress"));
  }, []);

  const registerVehicle = useCallback(
    async (
      username,
      number,
      vehicleImageHash,
      adharCardImageHash,
      RC_ImageHash
    ) => {
      try {
        if (typeof window.ethereum === "undefined") {
          console.error("Ethereum provider is not available.");
          return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const infuraProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await infuraProvider.getSigner();
        const contractWithSigner = writeContractInstance.connect(signer);
        const username = localStorage.getItem("username");
        console.log("username:", username);
        const tx = await contractWithSigner.registerVehicle(
          username,
          number,
          vehicleImageHash,
          adharCardImageHash,
          RC_ImageHash
        );
        console.log("Transaction sent: ", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction mined: ", receipt);
      } catch (error) {
        console.error("Error registering vehicle: ", error);
      }
    },
    [walletAddress]
  );

  return { registerVehicle };
};

export { useVehicleRegistration };
