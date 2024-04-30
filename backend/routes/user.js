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



userRouter.post("/signin", async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Check if the user exists with the provided email or username
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
        return res.status(200).json({
            success: true,
            message: "User Login successfull",
            token: token
        });
    }
    catch (err) {
        console.error('Error during signin:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
})

module.exports = userRouter;
