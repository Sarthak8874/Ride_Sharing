// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RideSharing {
    struct User {
        string name;
        string email;
        string password;
        string walletAddress;
        address[] vehicleIds;
    }
    struct Vehicle {
        string vehicleNumber;
        string ownerName;
        string ownerIdProof;
        string vehicleModel;
        string vehicleRC;
        string approvedStatus;
        string vehicleImage;
    }

    struct Ride {
        address driverId;
        string sourceId;
        string sourceName;
        string destinationId;
        string destinationName;
        address vehicleId;
        uint etherCost;
        uint distance;
        uint date;
        string startTime;
        string endTime;
        uint numberOfSeats;
        uint numberOfAvailableSeats;
        bool rideBooked;
        address[] riders;
        uint[] transactionIds;
    }

    struct Transaction {
        uint rideId;
        address riderId;
        uint etherCost;
        uint numberOfPassenger;
        string status;
    }

    mapping(address => Vehicle) public vehicles;
    mapping(uint => Ride) public rides;
    mapping(uint => Transaction) public transactions;
    mapping(address => User) public users;

    event UserRegistered(
        address indexed userAddress,
        string firstName,
        string lastName,
        string email,
        string phoneNumber,
        string username
    );

    function registerUser(
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _walletAddress
    ) public {
        require(bytes(users[msg.sender].email).length == 0, "User already registered");
        
        User storage user = users[msg.sender];
        
        user.name = _name;
        user.email = _email;
        user.password = _password;
        user.walletAddress = _walletAddress;
        
        emit UserRegistered(msg.sender, _name, _email, _password, _walletAddress, "");
    }

    function addVehicleId(address _userAddress, address _vehicleId) public {
        require(bytes(users[_userAddress].email).length != 0, "User not registered");
        users[_userAddress].vehicleIds.push(_vehicleId);
    }

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    uint public rideCounter = 0;
    uint public transactionCounter = 0;

    event VehicleRegistered(address indexed ownerId, string vehicleNumber);
    event RidePublished(uint indexed rideId, address indexed driverId, string sourceId, string destinationId);
    event RideBooked(uint indexed transactionId, uint indexed rideId, address indexed riderId, uint numberOfPassenger);
    event TransactionStatusUpdated(uint indexed transactionId, string status);

    function registerVehicle(
        string memory _vehicleNumber,
        string memory _ownerName,
        string memory _ownerIdProof,
        string memory _vehicleModel,
        string memory _vehicleRC,
        string memory _vehicleImage
    ) public {
        vehicles[msg.sender] = Vehicle({
            vehicleNumber: _vehicleNumber,
            ownerName: _ownerName,
            ownerIdProof: _ownerIdProof,
            vehicleModel: _vehicleModel,
            vehicleRC: _vehicleRC,
            approvedStatus: "Pending",
            vehicleImage: _vehicleImage
        });

        emit VehicleRegistered(msg.sender, _vehicleNumber);
    }

    function publishRide(
        string memory _sourceId,
        string memory _sourceName,
        string memory _destinationId,
        string memory _destinationName,
        address _vehicleId,
        uint _etherCost,
        uint _distance,
        uint _date,
        string memory _startTime,
        string memory _endTime,
        uint _numberOfSeats
    ) public {
        require(keccak256(bytes(_sourceId)) != keccak256(bytes(_destinationId)), "Source and destination must be different");
        require(_etherCost > 0, "Ether cost must be greater than 0");
        require(_date >= block.timestamp, "Date must be greater than or equal to current date");

        rides[rideCounter] = Ride({
            driverId: msg.sender,
            sourceId: _sourceId,
            sourceName: _sourceName,
            destinationId: _destinationId,
            destinationName: _destinationName,
            vehicleId: _vehicleId,
            etherCost: _etherCost,
            distance: _distance,
            date: _date,
            startTime: _startTime,
            endTime: _endTime,
            numberOfSeats: _numberOfSeats,
            numberOfAvailableSeats: _numberOfSeats,
            rideBooked: false,
            riders: new address[](0),
            transactionIds: new uint[](0)
        });

        emit RidePublished(rideCounter, msg.sender, _sourceId, _destinationId);
        rideCounter++;
    }

    function bookRide(uint _rideId, uint _numberOfPassenger) public payable {
        Ride storage ride = rides[_rideId];
        require(_numberOfPassenger > 0, "Number of passengers must be greater than 0");
        require(ride.numberOfAvailableSeats >= _numberOfPassenger, "Not enough available seats");
        require(msg.value == ride.etherCost * _numberOfPassenger, "Incorrect Ether value");

        ride.numberOfAvailableSeats -= _numberOfPassenger;
        ride.riders.push(msg.sender);

        transactions[transactionCounter] = Transaction({
            rideId: _rideId,
            riderId: msg.sender,
            etherCost: ride.etherCost,
            numberOfPassenger: _numberOfPassenger,
            status: "Pending"
        });

        ride.transactionIds.push(transactionCounter);

        emit RideBooked(transactionCounter, _rideId, msg.sender, _numberOfPassenger);
        transactionCounter++;
    }

    function updateTransactionStatus(uint _transactionId, string memory _status) public {
        Transaction storage txn = transactions[_transactionId];
        require(txn.rideId < rideCounter, "Invalid transaction ID");
        require(keccak256(bytes(_status)) == keccak256(bytes("Success")) || keccak256(bytes(_status)) == keccak256(bytes("Pending")) || keccak256(bytes(_status)) == keccak256(bytes("Failed")), "Invalid status");

        txn.status = _status;

        emit TransactionStatusUpdated(_transactionId, _status);
    }

    function getRideDetails(uint _rideId) public view returns (Ride memory) {
        require(_rideId < rideCounter, "Ride does not exist");
        return rides[_rideId];
    }

    function getTransactionDetails(uint _transactionId) public view returns (Transaction memory) {
        require(_transactionId < transactionCounter, "Transaction does not exist");
        return transactions[_transactionId];
    }

    function getAvailableRides(
        string memory _sourceId,
        string memory _destinationId,
        uint _date
    ) public view returns (Ride[] memory) {
        uint count = 0;

        for (uint i = 0; i < rideCounter; i++) {
            if (
                keccak256(bytes(rides[i].sourceId)) == keccak256(bytes(_sourceId)) &&
                keccak256(bytes(rides[i].destinationId)) == keccak256(bytes(_destinationId)) &&
                rides[i].date == _date &&
                rides[i].numberOfAvailableSeats > 0
            ) {
                count++;
            }
        }

        Ride[] memory availableRides = new Ride[](count);
        uint index = 0;

        for (uint i = 0; i < rideCounter; i++) {
            if (
                keccak256(bytes(rides[i].sourceId)) == keccak256(bytes(_sourceId)) &&
                keccak256(bytes(rides[i].destinationId)) == keccak256(bytes(_destinationId)) &&
                rides[i].date == _date &&
                rides[i].numberOfAvailableSeats > 0
            ) {
                availableRides[index] = rides[i];
                index++;
            }
        }

        return availableRides;
    }

}
