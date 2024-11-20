import { ethers } from "ethers";
import { abi2 } from "./abi2";
import { contractAddress2 } from "./contractAddress2";
// ----- REAPLACE THE RPC PROIVER WITH YOURS ONE

const infuraProvider = new ethers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);
export const readContractInstance2 = new ethers.Contract(
    contractAddress2,
    abi2,
    infuraProvider
);
console.log("Second Read Contract ", readContractInstance2);
