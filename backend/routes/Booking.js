const express = require("express");
const Published = require("../models/Published");
const Vehicle = require("../models/Vehicle");
const { error } = require("console");
const router = express.Router();
const auth = require("../middleware/auth");
const Transactions = require("../models/Transactions");

// Publish a new ride
router.post("/publish", auth, async (req, res) => {

  const data = new Published({
    ...req.body,
    driverId: req.user._id
  });
  try {
    await data.save();
    return res.status(200).json({
      success: true,
      message: "Published done",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Get feasible rides as per the search criteria
router.get("/search", auth, async (req, res) => {
  try {
    const { sourceId, destinationId, date, seatsRequired } = req.body;

    // Convert the seatsRequired to a number
    const seats = parseInt(seatsRequired);
    const userId = req.user._id;
    if (seats <= 0 || isNaN(seats)) {
      return res.status(400).json({
        success: false,
        message: "Invalid number of seats",
      });
    }
    if (sourceId === destinationId) {
      return res.status(400).json({
        success: false,
        message: "Source and destination cannot be same",
      });
    }
    // Find all feasible rides based on the provided criteria
    const feasibleRides = await Published.find({
      sourceId,
      destinationId,
      date: new Date(date),
      numberOfAvailableSeats: { $gte: seats },
      rideBooked: false,
      driverId: { $ne: userId },
    }).populate('driverId').populate('vehicleId');

    // Send the array of feasible rides as the response
    const feasibleRidesWithoutIds = feasibleRides.map(ride => {
      const { driverId, vehicleId, ...rideWithoutIds } = ride.toObject(); // Extract driverId and vehicleId
      const driverDetails = {
        firstName: ride.driverId.firstName,
        lastName: ride.driverId.lastName,
      };
      const vehicleDetails = {
        // vehicleNumber: ride.vehicleId.vehicleNumber,
      };
      return { ...rideWithoutIds, driver: driverDetails, vehicle: vehicleDetails };
    });
    
    // Send the array of feasible rides with driver details as the response
    res.status(200).json({
      success: true,
      message: 'Feasible rides found',
      data: feasibleRidesWithoutIds,
    });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Book a ride
router.post("/book/:id", auth, async (req, res) => {
  try {
    const { seatsRequired } = req.body;
    const rideId = req.params.id;
    const riderId = req.user._id;
    const ride = await Published.findById(rideId);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }
    if (ride.numberOfAvailableSeats < seatsRequired) {
      return res.status(400).json({
        success: false,
        message: "Not enough available seats",
      });
    }
    if(seatsRequired <= 0){
      return res.status(400).json({
        success: false,
        message: "Invalid number of seats",
      });
    }
    if(riderId.equals(ride.driverId)){
      return res.status(400).json({
        success: false,
        message: "Driver cannot book his own ride",
      });
    }
    ride.numberOfAvailableSeats -= seatsRequired;
    if (ride.numberOfAvailableSeats === 0) {
      ride.rideBooked = true;
    }
    ride.riders.push(riderId)
    const transaction = new Transactions({rideId, riderId, numberOfPassenger:seatsRequired, etherCost:ride.etherCost})
    await transaction.save();
    ride.transactionIds.push(transaction);
    await ride.save();
    res.status(200).json({
      success: true,
      message: "Ride booked successfully",
      data:ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
