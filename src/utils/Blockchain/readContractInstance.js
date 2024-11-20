import { ethers } from "ethers";
import { abi } from "./abi";
import { contractAddress } from "./contractAddress";
// ----- REAPLACE THE RPC PROIVER WITH YOURS ONE

const infuraProvider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);
export const readContractInstance = new ethers.Contract(
  contractAddress,
  abi,
  infuraProvider
);
console.log("first Read Contract ", readContractInstance);
