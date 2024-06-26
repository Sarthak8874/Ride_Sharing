"use client";
import React, { useContext } from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import OurServices from "@/components/OurServices"
import { useEffect, useState } from "react";
import { UserContext } from "@/utils/UserProvider";
import axios from "axios";
import { get } from "http";


const words = [
  {
    text: "Enjoy",
  },
  {
    text: "travelling",
  },
  {
    text: "with us",
  },
  {
    text: "along with",
  },
  {
    text: "Enhanced Security.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

function HomePage() {
  const {token, userData,setUserData} = useContext(UserContext);
  const [connected, toggleConnect] = useState(false);
  const [currAddress, updateAddress] = useState("No Address Currently");
  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }
  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      console.log(`You're connected to: ${accounts[0]}`);
      toggleConnect(true);
      getAddress();
    } else {
      console.log("Metamask is not connected");
    }
  }
  const backendUrl = process.env.NEXT_PUBLIC_URL;
  async function connectWebsite() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const addr = await signer.getAddress();
    updateAddress(addr);
    setUserData({...userData,walletAddress:addr});
    toggleConnect(true);
    axios.put(`${backendUrl}/user/update-wallet`, {
      walletAddress: addr
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err.response.data);
    }
    );
  }
  useEffect(() => {
    if(userData){
      if(userData.walletAddress!==null){
        updateAddress(userData.walletAddress);
        toggleConnect(true);
      }
      else{
        updateAddress("No Address Currently");
        toggleConnect(false);
      }
    }
    else{
      updateAddress("No Address Currently");
      toggleConnect(false);
    }
  }, [userData,token]);

  

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[40rem]  ">
        <h2 className="text-neutral-600 dark:text-neutral-200 md:text-red-800 lg:text-green-900 md:text-lg lg:text-xl text-extrabold sm:text-base  text-center ">
          Revolutionize transportation with our blockchain-powered peer-to-peer
          ridesharing platform.
        </h2>
        <TypewriterEffectSmooth words={words} />
        <p className="w-[90%] text-neutral-600 mx-auto text-center h-10 rounded-xl  dark:border-white border-transparent  text-sm md:text-lg">
          Join our community to experience secure, transparent, and efficient
          ridesharing like never before
        </p>
        { !connected && token &&  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4">
          <Link href="#textreveal">
            <Button
              borderRadius="1.75rem"
              className=" dark:bg-slate-900  dark:text-white border-neutral-200 dark:border-slate-800 w-40 h-10 rounded-xl bg-white text-black border  text-bold"
              onClick={connectWebsite}
            >
              Connect Wallet
            </Button>
          </Link>
        </div>
        }
      </div>

      <div
        id="textreveal"
        className="flex items-center justify-center h-[40rem]  w-full"
      >
        <TextRevealCard
          text="See wallet address Here"
          revealText={`${currAddress}`}
        >
          <TextRevealCardTitle>
            Sometimes, you just need to see it.
          </TextRevealCardTitle>
          <TextRevealCardDescription>
            Hover to see your wallet address
          </TextRevealCardDescription>
        </TextRevealCard>
      </div>

      <OurServices/>
    </div>
  );
}

export default HomePage;