// hooks/useWalletConnection.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { add } from "date-fns";

const useWalletConnection = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const walletAddresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (walletAddresses.length > 0) {
          const address = walletAddresses[0];
          setWalletAddress(address);

          const ethProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(ethProvider);

          const balance = await ethProvider.getBalance(address);
          setBalance(ethers.formatEther(balance));
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    if (walletAddress && provider) {
      console.log("Wallet connected:", walletAddress);
      console.log("Provider:", provider);
    }
    localStorage.setItem("walletAddress", walletAddress);
  }, [walletAddress, provider]);

  return { walletAddress, balance, connectWallet };
};

export default useWalletConnection;
