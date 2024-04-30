const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerUsername:{
        type: String,
        required: true
    },
    ownerIdProof: {
        type: String,
        required: true
    },
    // ownerId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    vehicleRC: {
        type: String,
        required: false
    },
    approvedStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: 'Pending'
    },
    vehicleImage:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Vehicle", vehicleSchema);