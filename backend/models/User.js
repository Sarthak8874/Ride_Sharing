const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        // required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
        lowercase: true,
    },
    profilePhoto: {
        type: String
    },
    idProof: {
        type: String
    },
    isDriver: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRides: {
        type: Number,
        default: 0
    },
    vehicleIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]

});


module.exports = mongoose.model("User",userSchema);