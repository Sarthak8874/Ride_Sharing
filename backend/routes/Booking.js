const express = require("express");
const Published = require("../models/Published");
const Vehicle = require("../models/Vehicle");
const { error } = require("console");
const router = express.Router();

// Publish a new ride
router.post("/publish", async (req, res) => {
  const {
    sourceId,
    sourceName,
    destinationId,
    destinationName,
    vehicleId,
    driverId,
    etherCost,
    distance,
    date,
    time,
    startTime,
    endTime,
    numberOfSeats,
  } = req.body;

  const data = new Published({
    sourceId,
    sourceName,
    destinationId,
    destinationName,
    vehicleId,
    driverId,
    etherCost,
    distance,
    date,
    time,
    startTime,
    endTime,
    numberOfSeats,
  });

  try {
    await data.save();
    return res.status(200).json({
      message: "Published done",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

// Get feasible rides as per the search criteria
router.get("/search", async (req, res) => {
  try {
    const { sourceId, destinationId, date, seatsRequired } = req.body;

    // Convert the seatsRequired to a number
    const seats = parseInt(seatsRequired);

    if (seats <= 0 || isNaN(seats)) {
      return res.status(400).json({
        message: "Invalid number of seats",
      });
    }
    if (sourceId === destinationId) {
      return res.status(400).json({
        message: "Source and destination cannot be same",
      });
    }
    // if(new Date(date) < new Date()){
    //   return res.status(400).json({
    //     message: "Date must be greater than current date",
    //   });
    // }

    // Find all feasible rides based on the provided criteria
    const feasibleRides = await Published.find({
      sourceId,
      destinationId,
      date: new Date(date),
      numberOfAvailableSeats: { $gte: seats }, // Filter out rides with fewer seats than required
      rideBooked: false,
    });

    // Send the array of feasible rides as the response
    res.status(200).json(feasibleRides);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { rideId, seatsRequired } = req.body;

    const ride = await Published.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (ride.numberOfAvailableSeats < seatsRequired) {
      return res.status(400).json({ message: "Not enough available seats" });
    }
    ride.numberOfAvailableSeats -= seatsRequired;
    if (ride.numberOfAvailableSeats === 0) {
      ride.rideBooked = true;
    }
    await ride.save();
    res.status(200).json({ message: "Ride booked successfully", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
