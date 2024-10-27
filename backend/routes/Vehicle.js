const express = require("express");
const VehiRouter = express.Router();
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
require("dotenv").config();

const PinataSDK = require("@pinata/sdk");

const fs = require("fs");
const pinata = new PinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY_URL,
});

//vehicle registration
VehiRouter.post("/register", async (req, res) => {
  try {
    const {
      username,
      name,
      vehicleNumber,
      vehicleImg,
      idProof,
      vehicleModel,
      vehicleRc,
      approvedStatus,
    } = req.body;

    console.log(req.body);

    async function uploadImage(filePath, fileName) {
      try {
        if (!filePath) return null;
        console.log(filePath);

        const res = await pinata.testAuthentication();
        console.log("Pinata Connection: ", res);

        const readableStreamForFile = fs.createReadStream(filePath);
        const options = {
          pinataMetadata: {
            name: `${fileName}-${Math.random()}-${Date.now()}`,
            keyvalues: {
              folder: fileName,
            },
          },
          pinataOptions: {
            cidVersion: 0,
          },
        };
        const result = await pinata.pinFileToIPFS(
          readableStreamForFile,
          options
        );
        console.log(result);
        return result.IpfsHash;
      } catch (error) {
        console.error("Error uploading to Pinata:", error.message);
        throw new Error("Failed to upload image");
      }
    }

    //Proof( by pinata): https://orange-general-muskox-149.mypinata.cloud/ipfs/QmcZ7nXYRRcnnxA3mVyg3CJeX437dqG8yDBUDjKkzSXz4s

    //Global (public IPFS Gateway) : https://ipfs.io/ipfs/QmcZ7nXYRRcnnxA3mVyg3CJeX437dqG8yDBUDjKkzSXz4s

    const vehicleImage = await uploadImage(
      req?.files?.vehicleImg?.tempFilePath,
      "vehicleImg"
    );
    const ownerIdProof = await uploadImage(
      req?.files?.idProof?.tempFilePath,
      "IdProof"
    );
    const vehicleRC = await uploadImage(
      req?.files?.vehicleRc?.tempFilePath,
      "vehicleRc"
    );

    const veh = await Vehicle.create({
      ownerUsername: username,
      ownerName: name,
      vehicleNumber,
      vehicleImage,
      ownerIdProof,
      vehicleModel,
      approvedStatus: "Approved",
      vehicleRC,
    });

    // Update user model with the ID of the created vehicle
    try {
      const u = await User.findOneAndUpdate(
        { username: username },
        { $push: { vehicleIds: veh._id } },
        { new: true }
      );
    } catch (error) {
      return res.status(200).json({
        success: true,
        message: "Vehicle Registration Done But User not exist(Not linked)",
        Data: veh,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle Registration Done",
      Data: veh,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Vehicle Registration Failed",
      error: e.message,
    });
  }
});

//all vehicles for particular user (approved ones only)
VehiRouter.get("/all/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const vehicles = await Vehicle.find({
      ownerUsername: username,
      approvedStatus: "Approved",
    });
    return res.status(200).json({
      success: true,
      message: "All Vehicles for that user",
      data: vehicles,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to get vehicles",
      error: e,
    });
  }
});

//all vehicles for verification
VehiRouter.get("/all", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    return res.status(200).json({
      success: true,
      message: "All Vehicles",
      data: vehicles,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to get vehicles",
      error: e,
    });
  }
});
module.exports = VehiRouter;
