import { abi } from "./abi";
import { contractAddress } from "./contractAddress";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();
const writeContractInstance = new ethers.Contract(contractAddress, abi, signer);
console.log(writeContractInstance);
export { writeContractInstance };
