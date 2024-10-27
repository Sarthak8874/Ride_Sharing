import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { UserContext } from "@/utils/UserProvider";
const { ethereum } = window;
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const sendTransaction = async (
  driverWallet: string,
  userWallet: string
) => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");
    // const addressTo = "0x5fA1EFD1552F97b26Ccc939e0CcF5e6F738C9164";
    const addressTo = `${driverWallet}`;
    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther("0.0000001");

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          // from: "0xcf214706B59A9A329a96Bf2042310fc98dA88Dad",
          from: `${userWallet}`,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      "hello",
      "123"
    );
    console.log("Transaction Hash:", transactionHash);
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};

function getRandomEtherAmount(min: number, max: number) {
  // Generate a random number between the given min and max range
  const randomAmount = (Math.random() * (max - min) + min).toFixed(8); // Keeping precision up to 8 decimal places
  return randomAmount;
}

// Define the range
const minAmount = 0.0006;
const maxAmount = 0.00061;

export const publishTransaction = async (userWallet: string) => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");
    const addressTo = "0x5fA1EFD1552F97b26Ccc939e0CcF5e6F738C9164";
    // const addressTo = `${driverWallet}`;
    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther("0.000005");

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          // from: "0xcf214706B59A9A329a96Bf2042310fc98dA88Dad",
          from: `${userWallet}`,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      "hello",
      "123"
    );
    console.log("Transaction Hash:", transactionHash);
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};

export const registerTransaction = async (userWallet: string) => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");
    const addressTo = "0x5fA1EFD1552F97b26Ccc939e0CcF5e6F738C9164";
    // const addressTo = `${driverWallet}`;
    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther(
      getRandomEtherAmount(minAmount, maxAmount).toString()
    );

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          // from: "0xcf214706B59A9A329a96Bf2042310fc98dA88Dad",
          from: `${userWallet}`,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      "hello",
      "123"
    );
    console.log("Transaction Hash:", transactionHash);
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};
