// import { ethers } from "ethers";
// import { contractABI, contractAddress } from "../utils/constants";

// const { ethereum } = window;

// const getEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const userContract = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   );
//   return userContract;
// };

// export const sendTransaction = async (driverWallet, userWallet) => {
//   try {
//     if (!ethereum) return alert("Please install MetaMask.");

//     const transactionContract = getEthereumContract();
//     const parsedAmount = ethers.utils.parseEther("0.0000001");

//     await ethereum.request({
//       method: "eth_sendTransaction",
//       params: [
//         {
//           from: userWallet,
//           to: driverWallet,
//           gas: "0x5208", // 21000 Gwei
//           value: parsedAmount._hex,
//         },
//       ],
//     });

//     const transactionHash = await transactionContract.addToBlockchain(
//       driverWallet,
//       parsedAmount,
//       "hello",
//       "123"
//     );

//     console.log("Transaction Hash:", transactionHash);
//   } catch (error) {
//     console.log(error);
//     throw new Error("No ethereum object.");
//   }
// };

// export const createUser = async (userData) => {
//   try {
//     const transactionContract = getEthereumContract();
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       phoneNumber,
//       username,
//       profilePhoto,
//       idProof,
//       isDriver,
//       vehicleIds,
//     } = userData;

//     const tx = await transactionContract.createUser(
//       firstName,
//       lastName,
//       email,
//       password,
//       phoneNumber,
//       username,
//       profilePhoto,
//       idProof,
//       isDriver,
//       vehicleIds
//     );

//     await tx.wait();

//     console.log("User created:", tx);
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error creating user.");
//   }
// };

// export const getUser = async (walletAddress) => {
//   try {
//     const transactionContract = getEthereumContract();
//     const user = await transactionContract.getUser(walletAddress);
//     console.log("User Details:", user);
//     return user;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error fetching user.");
//   }
// };
