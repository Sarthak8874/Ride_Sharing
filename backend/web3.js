// Import Web3.js library
const Web3 = require('web3');

// Initialize Web3 with your Ethereum provider
const web3 = new Web3(process.env.WEB_URL);

// Import your smart contract ABI (Application Binary Interface)
const contractABI = require('./ContractABI.json');

// Create a new instance of your smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example function to interact with your smart contract
async function bookRide(fromLocation, toLocation, timestamp) {
    // Get the user's Ethereum account from the provider (e.g., MetaMask)
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0]; // Assuming user has selected an account in MetaMask

    // Call the 'bookRide' function of your smart contract
    const result = await contract.methods.bookRide(fromLocation, toLocation, timestamp).send({
        from: userAccount,
    });

    console.log('Transaction hash:', result.transactionHash);
    // You can handle the result or emit events based on the transaction status
}

// Example function to get ride details from the smart contract
async function getRideDetails() {
    // Get the user's Ethereum account from the provider (e.g., MetaMask)
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0]; // Assuming user has selected an account in MetaMask

    // Call the 'getRideDetails' function of your smart contract
    const result = await contract.methods.getRideDetails().call({
        from: userAccount,
    });

    console.log('Ride Details:', result);
    // You can handle the result and display it in your frontend
}

// Export the functions for use in other files if needed
module.exports = {
    bookRide,
    getRideDetails,
};
