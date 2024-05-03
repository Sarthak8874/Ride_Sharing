const express = require("express");
const VehiRouter = express.Router();
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

const cloudinary = require("cloudinary").v2;

//vehicle registration
VehiRouter.post("/register", async (req, res) => {
    try {
        const {
            username,
            name,
            vehicleNumber,
            vehicleImg,
            idProof,
            vehicleRc,
            approvedStatus,
        } = req.body;

        console.log(req.body);

        async function uploadImage(imagePath,folderName) {
            try {
                const result = await cloudinary.uploader.upload(imagePath, {
                    unique_filename: true,
                    folder: folderName,
                });
                return result.secure_url;
            } catch (error) {
                throw new Error(error);
            }
        }

        const vehicleImage = await uploadImage(vehicleImg,"vehicleImg");
        const ownerIdProof = await uploadImage(idProof,"IdProof");
        const vehicleRC = await uploadImage(vehicleRc,"vehicleRc");

        const veh = await Vehicle.create({
            ownerUsername: username,
            ownerName: name,
            vehicleNumber,
            vehicleImage,
            ownerIdProof,
            approvedStatus,
            vehicleRC,
        });

        // Update user model with the ID of the created vehicle
        try {
            const u =await User.findOneAndUpdate(
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
            error: e,
        });
    }
});

//all vehicles for particular user
VehiRouter.get("/all/:username", async (req, res) => {
    try {
        const username  = req.params.username;
        const vehicles = await Vehicle.find({ ownerUsername: username, approvedStatus: 'Approved' });
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