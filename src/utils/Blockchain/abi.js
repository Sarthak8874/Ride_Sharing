export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "string",
        name: "_fromCity",
        type: "string",
      },
      {
        internalType: "string",
        name: "_toCity",
        type: "string",
      },
      {
        internalType: "string",
        name: "_rideDate",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_passengers",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_rideType",
        type: "string",
      },
      {
        internalType: "string",
        name: "_pickTime",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dropTime",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_passengerCost",
        type: "uint256",
      },
    ],
    name: "publishRide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vehicalOwner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_number",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_vehicalImageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_adharCardImageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_RC_ImageHash",
        type: "string",
      },
    ],
    name: "vehicalRegistration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRidesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rides",
    outputs: [
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "string",
        name: "fromCity",
        type: "string",
      },
      {
        internalType: "string",
        name: "toCity",
        type: "string",
      },
      {
        internalType: "string",
        name: "rideDate",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "passengers",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "rideType",
        type: "string",
      },
      {
        internalType: "string",
        name: "pickUpTime",
        type: "string",
      },
      {
        internalType: "string",
        name: "dropTime",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "passengerCost",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vehicals",
    outputs: [
      {
        internalType: "address",
        name: "vehicalOwner",
        type: "address",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "vehicalImageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "adharCardImageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "RC_ImageHash",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
