export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_vehicleIndex",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_rideDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "_passengers",
        type: "string",
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
        name: "_pickUpTime",
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
        internalType: "string",
        name: "_username",
        type: "string",
      },
      {
        internalType: "string",
        name: "_number",
        type: "string",
      },
      {
        internalType: "string",
        name: "_vehicleImageHash",
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
    name: "registerVehicle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_firstName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_lastName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_emailAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
      {
        internalType: "string",
        name: "_confirmPassword",
        type: "string",
      },
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
      {
        internalType: "string",
        name: "_phoneNumber",
        type: "string",
      },
    ],
    name: "signUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPublishedVehicleCount",
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
    inputs: [],
    name: "getPublishedVehicles",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "vehicleNumber",
            type: "string",
          },
          {
            internalType: "string",
            name: "rideDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "passengers",
            type: "string",
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
        internalType: "struct RideSharing.PublishVehicle[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
    ],
    name: "getUserVehicles",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "number",
            type: "string",
          },
          {
            internalType: "string",
            name: "vehicleImageHash",
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
        internalType: "struct RideSharing.RegisterVehicle[]",
        name: "",
        type: "tuple[]",
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
    name: "publishedVehicles",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "vehicleNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "rideDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "passengers",
        type: "string",
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
];
