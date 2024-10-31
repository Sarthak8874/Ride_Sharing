import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEthereum } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";

interface Ride {
  _id: string;
  username: string; // Use username instead of driver details
  pickUpTime: string;
  dropTime: string;
  passengerCost: number;
  fromCity: string;
  toCity: string;
}

const BookComponent: React.FC<{ ride: Ride }> = ({ ride }) => {
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    toast.success("Moving to booking page");
    router.push(`/book/67238bd43869a75671bd0a6c`);
  };

  const pickUpTime = ride.pickUpTime; // Example pick-up time
  const dropTime = ride.dropTime; // Example drop-off time

  // Parse the times
  const format = "hh:mm A"; // Define the time format
  const moment1 = moment(pickUpTime, format);
  const moment2 = moment(dropTime, format);

  // Check if the drop time is earlier than the pick-up time
  if (moment2.isBefore(moment1)) {
    // Add one day to the drop time
    moment2.add(1, "days");
  }

  // Calculate the difference in minutes
  const differenceInMinutes = moment2.diff(moment1, "minutes");

  // Convert the difference into hours and minutes
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  // Format the result as hh:mm
  const formattedDifference = `${hours}h ${minutes}min`;

  console.log(`Total difference: ${formattedDifference}`);

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
