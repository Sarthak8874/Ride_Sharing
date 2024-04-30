const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    sourceId: {
        type: String,
        required: true
    },
    destinationId: {
        type: String,
        required: true
    },
    vehicleId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    riderId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    etherCost: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    numberOfPassenger: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);