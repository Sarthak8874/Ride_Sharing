"use client";
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FaCar, FaEthereum } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/utils/UserProvider";
import withAuth from "@/components/withAuth";
import { useBookingState } from "@/utils/Blockchain/book/useBookingState";
import { useBookNow } from "../../../utils/Blockchain/book/useBookNow";
import { useBooking } from '@/context/BookingContext';
interface BookingData {
  _id: string;
  sourceId: string;
  sourceName: string;
  destinationId: string;
  destinationName: string;
  etherCost: number;
  distance: number;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  numberOfSeats: number;
  rideBooked: boolean;
  riders: Array<{ riderId: string; name: string; email: string }>;
  transactionIds: string[];
  numberOfAvailableSeats: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  driver: {
    firstName: string;
    lastName: string;
    username: string;
    walletAddress: string;
  };
  vehicle: {
    vehicleId: string;
    make: string;
    model: string;
    year: number;
    color: string;
  };
}

const Page = ({ params: { id: bookId } }: { params: { id: string } }) => {
  // const router = useRouter();
  const { bookingDataa } = useBooking();
  const [queryData,setQuerydata] = useState<any>();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const { userData } = useContext(UserContext);
  const [seatsRequired, setSeatsRequired] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const backendUrl = process.env.NEXT_PUBLIC_URL;
  const { bookingDetails } = useBookingState();
  const { bookNow, isLoading, isSuccess, error } = useBookNow();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    console.log("stored Username :", storedUsername);
    // Load booking details
    setBookingData({
      _id: "0123418400123012031230230",
      sourceId: "src_001",
      sourceName: "Pakistan",
      destinationId: "dest_001",
      destinationName: "India",
      etherCost: 5,
      distance: 15.5,
      date: "2024-11-15",
      time: "14:30",
      startTime: "14:00",
      endTime: "15:00",
      numberOfSeats: 4,
      rideBooked: true,
      riders: [
        {
          riderId: "rider_001",
          name: "Alice Smith",
          email: "alice@example.com",
        },
        { riderId: "rider_002", name: "Bob Johnson", email: "bob@example.com" },
      ],
      transactionIds: ["trans_001", "trans_002"],
      numberOfAvailableSeats: 2,
      createdAt: "2024-11-01T10:00:00Z",
      updatedAt: "2024-11-01T10:00:00Z",
      __v: 0,
      driver: {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      },
      vehicle: {
        vehicleId: "veh_001",
        make: "Toyota",
        model: "Camry",
        year: 2020,
        color: "blue",
      },
    });
  }, []);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { rideDate, fromCity, toCity, Driver,distance} = router.query;
  //     setQuerydata({ rideDate, fromCity, toCity, Driver,distance });
  //   }
  // }, [router.isReady]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!bookingData || !bookingData.driver) return;

    try {
      await bookNow(
        bookingData._id,
        username,
        "Pakistan",
        "India",
        bookingData.etherCost,
        seatsRequired,
        "11/07/2024"
      );

      setIsDisabled(true);
      await axios.post(
        `${backendUrl}/book/${bookId}`,
        { seatsRequired },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Booking Successful, Redirecting to search...");
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Booking Failed");
      setIsDisabled(false);
    }
  };

  const formatDate = (dateStr: string): string => {
    const dateObj = new Date(dateStr);
    const addLeadingZero = (num: number) =>
      num < 10 ? "0" + num : num.toString();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[dateObj.getDay()]}, ${addLeadingZero(dateObj.getDate())} ${
      months[dateObj.getMonth()]
    }`;
  };

  return (
    <div className="w-screen flex items-center flex-col mt-10 overflow-x-hidden">
      {!bookingData ? (
        <p>Loading...</p>
      ) : (
        <div className="min-w-[640px] mx-auto text-xl">
          {/* <h1 className="text-5xl font-bold text-center mx-auto">
            {formatDate(bookingDataa.)}
          </h1> */}
          <div className="flex justify-between mx-6 my-6">
            <p>{bookingDataa?.fromCity}</p>
            <div className="flex flex-col items-center">
              <FaCar />
              <p>{bookingDataa?.distance} km</p>
            </div>
            <p>{bookingDataa?.toCity}</p>
          </div>
          <div className="h-[10px] rounded-2xl bg-gray-200 my-6"></div>
          <div className="flex justify-between items-center mx-6">
            <p>Total Price for 1 Passenger</p>
            <p className="flex items-center">
              <FaEthereum /> {bookingData.etherCost}
            </p>
          </div>
          <div className="h-[10px] rounded-2xl bg-gray-200 my-6"></div>
          <div className="flex justify-between items-center mx-6">
            <p>{bookingDataa?.Driver}</p>
            <img
              className="w-16"
              src="https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg"
              alt="Driver"
            />
          </div>
          <div className="h-[2px] rounded-2xl bg-gray-200 my-6"></div>
          <div className="flex justify-between items-center mx-6">
            <p>Seats Available:</p>
            <p>{bookingData.numberOfAvailableSeats}</p>
          </div>
          <div className="h-[2px] rounded-2xl bg-gray-200 my-6"></div>
          <div className="flex justify-between items-center mx-6">
            <p>Book Seats</p>
            <select
              className="border-[3px] w-12 rounded-lg"
              value={seatsRequired.toString()}
              onChange={(e) => setSeatsRequired(parseInt(e.target.value))}
            >
              {Array.from(
                { length: bookingData.numberOfAvailableSeats },
                (_, i) => i + 1
              ).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="h-[2px] rounded-2xl bg-gray-200 my-6"></div>
          <div className="flex justify-center items-center mx-6">
            <Button
              disabled={isDisabled}
              className="text-xl p-6"
              onClick={handleSubmit}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
