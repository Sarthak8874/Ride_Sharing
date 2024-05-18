import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const sendTransaction = async () => {
    try {
        if (!ethereum) return alert("Please install MetaMask.");

        const addressTo = "0xd9cfd0e4a92ebe4cacc20e6c8532283e7ca7e9af"; 
        const transactionContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther("0.00001");

        await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: "0xd9cfd0e4a92ebe4cacc20e6c8532283e7ca7e9af",
                to: addressTo,
                gas: "0x5208",
                value: parsedAmount._hex,
            }]
        });
        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, "hello", "123");

    } catch (error) {
        console.log(error);

        throw new Error("No ethereum object.");
    }
};