const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publishedSchema = new mongoose.Schema({
    sourceId: {
        type: String,
        required: true
    },
    sourceName:{
        type: String,
        required: true
    },
    destinationId: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v !== this.sourceId;
            },
            message: "Destination must be different from source"
        }
    },
    destinationName:{
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
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: "Ether cost must be greater than 0"
        }
    },
    distance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return v >= new Date();
            },
            message: "Date must be greater than or equal to current date"
        }
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
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: "Number of seats must be greater than 0"
        }
    },
    numberOfAvailableSeats: {
        type: Number,
        default: function () {
            return this.numberOfSeats; 
        }
    },
    rideBooked: {
        type: Boolean,
        default: false 
    },
    riders:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    transactionIds: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Transactions'
    }]
}, {
    timestamps: true
    
});

module.exports = mongoose.model("Published", publishedSchema);