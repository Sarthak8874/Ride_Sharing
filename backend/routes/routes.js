const express = require("express");
const Contact = require("../models/Contact");

const { Data } = require("@react-google-maps/api");
const { error } = require("console");
const router = express.Router();
const userRoutes = require("./user");
const bookingRoute = require("./Booking");
const vehicleRoutes = require("./Vehicle");


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

//signIn, signUp
router.use("/user",userRoutes);

// publish, search, book
router.use(bookingRoute);

// vehicle 
router.use("/vehicle",vehicleRoutes)


module.exports = router;
