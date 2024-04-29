const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/test",async(req,res)=>{
    const {firstName,lastName,message,email} = req.body;

    const data = await Contact.create({firstName,lastName,message,email});

    return res.status(200).json({
        status : true,
        message:"testing done"
    });
});



module.exports = router;