const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new mongoose.Schema({
    vehicleNo: {
        type: String,
        required: true
    },
    papers: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approvedStatus: {
        type: String,
        enum: ['approve', 'pending', 'rejected'],
        default: 'pending'
    }

});

module.exports = mongoose.model("Vehicle", vehicleSchema);