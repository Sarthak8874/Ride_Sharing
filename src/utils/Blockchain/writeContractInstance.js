import { abi } from "./abi";
import { contractAddress } from "./contractAddress";
import { ethers } from "ethers";

const infuraProvider = new ethers.BrowserProvider(window.ethereum);
const signer = infuraProvider.getSigner();
export const writeContractInstance = new ethers.Contract(
  contractAddress,
  abi,
  signer
);

// const gasPrice = await walletProvider.send("eth_gasPrice", []);
console.log(writeContractInstance);
