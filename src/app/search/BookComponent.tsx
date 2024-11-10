import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEthereum } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";
import { useBookingState } from "../../utils/Blockchain/book/useBookingState";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { useBooking } from '@/context/BookingContext';

interface Ride {
  _id: string;
  username: string; // Use username instead of driver details
  pickUpTime: string;
  dropTime: string;
  passengerCost: number;
  fromCity: string;
  toCity: string;
  rideDate: string;
  totalDistance: string;
  passengers: number;
}

const BookComponent: React.FC<{ ride: Ride }> = ({ ride }) => {
  const { setBookingDataa } = useBooking();
  const router = useRouter();
  const { rideBooking } = useBookingState();
  const [bookRide, setBookRide] = useState<any>();

  const pickUpTime = ride.pickUpTime;
  const dropTime = ride.dropTime;

  const format = "hh:mm A";
  const moment1 = moment(pickUpTime, format);
  const moment2 = moment(dropTime, format);

  if (moment2.isBefore(moment1)) {
    moment2.add(1, "days");
  }

  const differenceInMinutes = moment2.diff(moment1, "minutes");

  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  const formattedDifference = `${hours}h ${minutes}min`;

  console.log(`Total difference: ${formattedDifference}`);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    console.log("handle submitted is cliecked")
    const bookingDetails = {
      rideDate: ride.rideDate,
      fromCity: ride.fromCity,
      toCity: ride.toCity,
      Driver: ride.username,
      distance: formattedDifference,
      // passengerCost: ride.passengerCost,
      // passengers: ride.passengers,
    };

    rideBooking({ bookRide: bookingDetails });

    toast.success("Moving to booking page");
    // const query = new URLSearchParams(bookingDetails).toString();
    // console.log(`Query: ${query}`);
    setBookingDataa(bookingDetails);
    router.push(`/book/67238bd43869a75671bd9f1c`);
  };

  return (
    <div className="m-[40px] border-[#7c7c7c] flex flex-col gap-[30px] h-[200px] rounded-[20px] cursor-pointer py-[20px] px-[10px] shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-between">
        <div className="flex gap-[20px] items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div>{ride.username}</div>
            <div className="flex justify-between items-center gap-[5px]">
              <IoStar />
              <span className="w-full text-left">4.8</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[5px] justify-center">
          <FaEthereum />
          <div>{ride.passengerCost}</div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[10px] h-[80px]">
          <div className="flex flex-col justify-between items-center">
            <div>{ride.pickUpTime}</div>
            <div className="text-[12px]">{formattedDifference}</div>
            <div>{ride.dropTime}</div>
          </div>
          <div className="flex flex-col items-center">
            <FaRegCircle />
            <div className="h-[65%] w-[5px]   bg-green-300 "></div>
            <FaRegCircle />
          </div>
          <div className="flex flex-col items-center justify-between">
            <div>{ride.fromCity}</div>
            <div className="text-left w-full">{ride.toCity}</div>
          </div>
        </div>
        <Button onClick={(e) => handleSubmit(e, ride._id)}>Book Now</Button>
      </div>
    </div>
  );
};

export default BookComponent;
