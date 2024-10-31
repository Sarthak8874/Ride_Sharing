"use client";
import React, { useEffect, useState } from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import OurServices from "@/components/OurServices";
import useWalletConnection from "../utils/Blockchain/useWalletConnection";
import { readContractInstance } from "../utils/Blockchain/readContractInstance.js";
import { writeContractInstance } from "../utils/Blockchain/writeContractInstance.js";

const words = [
  { text: "Enjoy" },
  { text: "travelling" },
  { text: "with us" },
  { text: "along with" },
  { text: "Enhanced Security.", className: "text-blue-500 dark:text-blue-500" },
];

function HomePage() {
  const { walletAddress, connectWallet } = useWalletConnection();
  const backendUrl = process.env.NEXT_PUBLIC_URL;
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername); // Update state with stored username
    console.log("Wallet Address:", walletAddress);
    console.log("read Contract Instance ", readContractInstance);
    console.log("write Contract Instance ", writeContractInstance);
  }, [walletAddress]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[40rem]">
        {/* Only show the connect button if a username exists */}
        {username ? (
          <button
            onClick={connectWallet}
            className="bg-blue-950 px-10 py-2 rounded-md text-white"
          >
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}
          </button>
        ) : (
          <p className="text-red-500">
            Please log in or sign up to connect your wallet.
          </p> // Message to guide user
        )}

        <h2 className="text-neutral-600 dark:text-neutral-200 md:text-red-800 lg:text-green-900 md:text-lg lg:text-xl text-extrabold sm:text-base text-center">
          Revolutionize transportation with our blockchain-powered peer-to-peer
          ridesharing platform.
        </h2>
        <TypewriterEffectSmooth words={words} />
        <p className="w-[90%] text-neutral-600 mx-auto text-center h-10 rounded-xl dark:border-white border-transparent text-sm md:text-lg">
          Join our community to experience secure, transparent, and efficient
          ridesharing like never before.
        </p>
      </div>
      <div className="w-full flex content-center items-center border"></div>
      <div
        id="textreveal"
        className="flex items-center justify-center h-[40rem] w-full"
      >
        <TextRevealCard
          text="See wallet address Here"
          revealText={walletAddress || "Wallet not Connected"}
        >
          <TextRevealCardTitle>
            Sometimes, you just need to see it.
          </TextRevealCardTitle>
          <TextRevealCardDescription>
            Hover to see your wallet address
          </TextRevealCardDescription>
        </TextRevealCard>
      </div>

      <OurServices />
    </div>
  );
}

export default HomePage;
