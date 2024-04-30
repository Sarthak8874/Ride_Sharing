const mongoose = require("mongoose");

const publishedSchema = new mongoose.Schema({
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
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    numberOfBookedSeats: {
        type: Number,
        default: 0 
    },
    rideBooked: {
        type: Boolean,
        default: false 
    },
    transactionIds: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Transactions'
    }]
});

module.exports = mongoose.model("Published", publishedSchema);