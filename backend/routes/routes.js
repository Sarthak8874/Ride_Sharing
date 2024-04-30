const express = require("express");
const Contact = require("../models/Contact");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
const { Data } = require("@react-google-maps/api");
const { error } = require("console");
const router = express.Router();
const userRoutes = require("./user");

const cloudinary = require("cloudinary").v2;

router.get("/", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "API is working",
    });
});

router.post("/test", async (req, res) => {
    const { firstName, lastName, message, email } = req.body;

    const data = await Contact.create({ firstName, lastName, message, email });

    return res.status(200).json({
        status: true,
        message: "testing done",
    });
});

router.use("/user",userRoutes);



//vehicle registration
router.post("/vehicle/register", async (req, res) => {
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
        // console.log(vehicleImage, ownerIdProof, vehicleRC);

        const data = await Vehicle.create({
            ownerUsername: username,
            ownerName: name,
            vehicleNumber,
            vehicleImage,
            ownerIdProof,
            approvedStatus,
            vehicleRC,
        });

        return res.status(200).json({
            status: true,
            message: "Vehicle Registration Done",
            Data: data,
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Vehicle Registration Failed",
            error: e,
        });
    }
});

//edit profile details (having some issue, need to check)
router.put("users/:id", async (req, res) => {
    try {
        console.log("HII",req.params);
       const username=req.params.id;
       const user = await User.findOneAndUpdate({ username: username }, req.body, {
         new: true,
         runValidators: true,
       });
   
       if (!user) {
        return res.status(404).json({
            status: false,
            message: "User Not Found",
            error: e,
        });
       }
   
       return res.status(200).json({
        status: true,
        message: "Vehicle Registration Done",
        new: user,
    });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Failed to update user details",
            error: e,
        });
    }
   });

module.exports = router;
