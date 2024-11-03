export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_driver",
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
        internalType: "uint256",
        name: "_passengerCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bookedSeats",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_date",
        type: "string",
      },
    ],
    name: "bookRide",
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
        internalType: "uint256",
        name: "_vehicleIndex",
        type: "uint256",
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
        name: "_numberOfSeats",
        type: "uint256",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bookedRide",
    outputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "driver",
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
        internalType: "uint256",
        name: "passengerCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bookedSeats",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "date",
        type: "string",
      },
    ],
    stateMutability: "view",
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
            internalType: "uint256",
            name: "numberOfSeats",
            type: "uint256",
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
        internalType: "uint256",
        name: "numberOfSeats",
        type: "uint256",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "updatedVehicleSeats",
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
        internalType: "uint256",
        name: "numberOfSeats",
        type: "uint256",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "firstName",
        type: "string",
      },
      {
        internalType: "string",
        name: "lastName",
        type: "string",
      },
      {
        internalType: "string",
        name: "emailAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
      {
        internalType: "string",
        name: "confirmPassword",
        type: "string",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "phoneNumber",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userVehicles",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
];