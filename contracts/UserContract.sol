// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RideSharing {
    uint256 public userCount = 0;
    uint256 public rideCount = 0;
    uint256 public rideUserCount = 0;

    struct User {
        uint256 id;
        string name;
        string carNo;
        string aadharNo;
    }

    struct Ride {
        uint256 id;
        uint256 driverId;
        uint256 uid1;
        uint256 uid2;
        uint256 uid3;
        string carNo;
        string source;
        string destination;
    }

    struct UserRide {
        uint256 id;
        uint256 rideId;
        uint256 driverId;
        uint256 userId;
        string carNo;
        string source;
        string destination;
    }

    mapping(uint256 => User) public users;
    mapping(uint256 => Ride) public rides;
    mapping(uint256 => UserRide) public userRides;

    function addUser(string memory name, string memory carNo, string memory aadharNo) public {
        userCount++;
        users[userCount] = User(userCount, name, carNo, aadharNo);
    }

    function addRide(uint256 driverId, uint256 uid1, uint256 uid2, uint256 uid3, string memory carNo, string memory source, string memory destination) public {
        rideCount++;
        rides[rideCount] = Ride(rideCount, driverId, uid1, uid2, uid3, carNo, source, destination);
    }

    function addUserRide(uint256 rideId, uint256 driverId, uint256 userId, string memory carNo, string memory source, string memory destination) public {
        rideUserCount++;
        userRides[rideUserCount] = UserRide(rideUserCount, rideId, driverId, userId, carNo, source, destination);
    }

    function makePayment(address payable driverAddress, address payable clientAddress, uint256 fare) public payable {
        require(msg.value == fare, "Incorrect fare amount");
        clientAddress.transfer(fare);
        driverAddress.transfer(fare);
    }
}