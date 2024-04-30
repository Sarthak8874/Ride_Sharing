const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();
const userRoutes = require("./user");


router.post("/test",async(req,res)=>{
    const {firstName,lastName,message,email} = req.body;

    const data = await Contact.create({firstName,lastName,message,email});

    return res.status(200).json({
        status : true,
        message:"testing done"
    });
});

router.use("/user",userRoutes);





module.exports = router;