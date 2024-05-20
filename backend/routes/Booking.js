const express = require("express");
const Published = require("../models/Published");
const Vehicle = require("../models/Vehicle");
const { error } = require("console");
const router = express.Router();
const auth = require("../middleware/auth");
const Transactions = require("../models/Transactions");
const axios = require("axios");

// Publish a new ride
router.post("/publish", auth, async (req, res) => {
  const data = new Published({
    ...req.body,
    driverId: req.user._id,
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

const getDistance = async (sourceId, destinationId) => {
  const apiKey = "AIzaSyDx5GRB6r2aS6ICayTDxpIX4wO71c4FniY"; // Replace with your actual API key
  const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${sourceId}&destinations=place_id:${destinationId}&key=${apiKey}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost' // Adjust as necessary
      }
    });
    if (response.data.status === 'OK') {
      const distance = response.data.rows[0].elements[0].distance.value; // distance in meters
      return distance / 1000; // convert to kilometers
    } else {
      console.error('Error from Google API:', response.data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching distance from Google API:', error);
    return null;
  }
};

// Get feasible rides as per the search criteria
router.get("/search", auth, async (req, res) => {
  try {
    
    const { sourceId, destinationId, date, seatsRequired } = req.query;
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
        message: "Source and destination cannot be the same",
      });
    }

    // Find all feasible rides based on the provided criteria
    let feasibleRides = await Published.find({
      date: date,
      numberOfAvailableSeats: { $gte: seats },
      rideBooked: false,
    })
      .populate("driverId")
      .populate("vehicleId");

    // Filter rides based on matching destinationId
    feasibleRides = feasibleRides.filter(
      (ride) => ride.destinationId === destinationId
    );
    
    // Filter rides based on distance between sourceId and destinationId
    const filteredRidesWithDistance = [];
    for (const ride of feasibleRides) {
      const distance = await getDistance(sourceId, ride.sourceId);
      if (distance !== null && distance < 25) {
        filteredRidesWithDistance.push({ ride, distance });
      }
    }

    // Sort rides by distance
    filteredRidesWithDistance.sort((a, b) => a.distance - b.distance);
    console.log(filteredRidesWithDistance);
    // Map and prepare the response data
    const feasibleRidesWithoutIds = filteredRidesWithDistance.map(
      ({ ride }) => {
        const { driverId, vehicleId, ...rideWithoutIds } = ride.toObject();
        const driverDetails = {
          firstName: ride.driverId.firstName,
          lastName: ride.driverId.lastName,
        };
        const vehicleDetails = {
          // Add any vehicle details if needed
        };
        return {
          ...rideWithoutIds,
          driver: driverDetails,
          vehicle: vehicleDetails,
        };
      }
    );

    res.status(200).json({
      success: true,
      message: "Feasible rides found",
      data: feasibleRidesWithoutIds,
    });
  } catch (error) {
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
    if (seatsRequired <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid number of seats",
      });
    }
    if (riderId.equals(ride.driverId)) {
      return res.status(400).json({
        success: false,
        message: "Driver cannot book his own ride",
      });
    }
    ride.numberOfAvailableSeats -= seatsRequired;
    if (ride.numberOfAvailableSeats === 0) {
      ride.rideBooked = true;
    }
    ride.riders.push(riderId);
    const transaction = new Transactions({
      rideId,
      riderId,
      numberOfPassenger: seatsRequired,
      etherCost: ride.etherCost,
    });
    await transaction.save();
    ride.transactionIds.push(transaction);
    await ride.save();
    res.status(200).json({
      success: true,
      message: "Ride booked successfully",
      data: ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get a ride by id
router.get("/book/:id", auth, async (req, res) => {
  try {
    const rideId = req.params.id;
    const ride = await Published.findById(rideId)
      .populate("driverId")
      .populate("vehicleId");
    if (ride === null) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }
    const { driverId, vehicleId, ...rideWithoutIds } = ride.toObject();
    const driverDetails = {
      firstName: ride.driverId.firstName,
      lastName: ride.driverId.lastName,
      username: ride.driverId.username,
      walletAddress: ride.driverId.walletAddress,
    };
    const vehicleDetails = {
      // vehicleNumber: ride.vehicleId.vehicleNumber,
    };
    const data = {
      ...rideWithoutIds,
      driver: driverDetails,
      vehicle: vehicleDetails,
    };

    res.status(200).json({
      success: true,
      message: "Ride found",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
