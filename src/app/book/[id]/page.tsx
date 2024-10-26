"use client";
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { set } from "date-fns";
import React, { useEffect, useState } from 'react'
import { FaCar, FaEthereum } from 'react-icons/fa';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { sendTransaction } from "../../../context/TransactionContext";
import { UserContext } from "@/utils/UserProvider";
import { useContext } from "react";
import withAuth from "@/components/withAuth";
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
  riders: any[]; // Assuming this can be any type of array
  transactionIds: any[]; // Assuming this can be any type of array
  numberOfAvailableSeats: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  driver: {
      firstName: string,
      lastName: string,
      username: string,
      walletAddress: string,
  };
  vehicle: any; // Assuming this can be any type
}

const page = ({params: {id: bookId}}: {params: {id: string}}) => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  console.log("greg",bookingData)
  const {userData} = useContext(UserContext);
  const [seatsRequired, setSeatsRequired] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const backendUrl = process.env.NEXT_PUBLIC_URL
  useEffect(() => {
      axios.get(`${backendUrl}/book/${bookId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      }).then((res) => {
          setBookingData(res.data.data)
          console.log(res.data.data)
      }).catch((err) => {
          console.log(err)
      })
  }, [])

  // Function to handle form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    if (bookingData && bookingData.driver) {
      await sendTransaction(bookingData.driver.walletAddress, userData.walletAddress);
    }
    setIsDisabled(true);
    axios.post(`${backendUrl}/book/${bookId}`, {
      seatsRequired
     }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
     }).then((res) => {
      console.log(res.data)
      toast.success("Booking Successful, Redirecting to search...");
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
     }).catch((err) => {
      console.log(err)
      toast.error("Booking Failed");
      setIsDisabled(false);
    })
    
  }

  // Function to format date
  const formatDate = (dateStr: string): string => {
    const dateObj = new Date(dateStr);
    const addLeadingZero = (num: number) => (num < 10 ? "0" + num : num.toString());
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek: number = dateObj.getDay();
    const dayOfWeekStr: string = days[dayOfWeek];
    const dayOfMonth: number = dateObj.getDate();
    const dayOfMonthStr: string = addLeadingZero(dayOfMonth);
    const monthIndex: number = dateObj.getMonth();
    const monthStr: string = months[monthIndex];
    const formattedDate: string = `${dayOfWeekStr}, ${dayOfMonthStr} ${monthStr}`;
    return formattedDate;
  };
  // const { sendTransaction} = React.useContext(TransactionContext);


  return (
    <div className='w-screen flex items-center flex-col mt-10 overflow-x-hidden '>
    {!bookingData && <p>Loading...</p>}
    {bookingData && (
      <div className='min-w-[640px] mx-auto text-xl'>
        <h1 className='text-5xl font-bold text-center mx-auto'>{formatDate(bookingData.date)}</h1>
        <div className="flex justify-between mx-6 my-6">
          <div className="">
            <p>{bookingData.sourceName}</p>
            {/* <p>{bookingData.startTime}</p> */}
          </div>
          <div className="flex flex-col items-center">
            <FaCar/>
          <p>{bookingData.distance} km</p>
          </div>
          <div className="">
            <p>{bookingData.destinationName}</p>
            {/* <p>{bookingData.endTime}</p> */}
          </div>
        </div>
        <div className="h-[10px] rounded-2xl bg-gray-200 my-6"></div>
        <div className="flex justify-between items-center mx-6">
          <p>Total Price for 1 Passenger</p>
          <p className='flex justify-center items-center'><FaEthereum/>{bookingData.etherCost}</p>
        </div>
        <div className="h-[10px] rounded-2xl bg-gray-200 my-6"></div>

        {/* Driver Details*/}
        <div className="flex justify-between items-center mx-6">
          <p>{bookingData.driver.firstName} {bookingData.driver.lastName}</p>
          <img className='w-16' src="https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg" alt="" />
        </div>
        <div className="h-[2px] rounded-2xl bg-gray-200 my-6"></div>

        {/* Seats Available */}
        <div className="flex justify-between items-center mx-6">
          <p>Seats Available:</p>
          <p>{bookingData.numberOfAvailableSeats}</p>
        </div>
        <div className="h-[2px] rounded-2xl bg-gray-200 my-6"></div>

        {/* No. of Seats Required */}
        <div className="flex justify-between items-center mx-6">
          <p>Book Seats</p>
          <p>
          <select
            name="seats"
            id="seats"
            className='border-[3px] w-12 rounded-lg'
            value={seatsRequired.toString()} // Ensure seatsRequired is converted to string for comparison
            onChange={(e) => setSeatsRequired(parseInt(e.target.value))}
          >
            {Array.from({ length: bookingData.numberOfAvailableSeats }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>

          </p>
        </div>
        <div className="h-[2px] rounded-2xl bg-gray-200 my-6"></div>
        
        {/* Booking Button */}
        <div className="flex justify-center items-center mx-6">
        <Button disabled={isDisabled} className="text-xl p-6" onClick={handleSubmit}>Book Now</Button>
        </div>
      </div>
    )}
    </div>
  )
}

export default page;