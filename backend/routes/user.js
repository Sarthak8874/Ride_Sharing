const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, walletAddress, phoneNumber, username } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            walletAddress,
            phoneNumber,
            username,
        });

        res.status(200).json({
            success: true,
            message: "User Signed up Successfully"
        })

    }
    catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
})

module.exports = userRouter;
