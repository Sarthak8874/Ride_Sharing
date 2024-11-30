import { abi2 } from "./abi2"
import { contractAddress2 } from "./contractAddress2";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();
const writeContractInstance2 = new ethers.Contract(contractAddress2, abi2, signer);
console.log("Second Write Contract ", writeContractInstance2);
export { writeContractInstance2 };
