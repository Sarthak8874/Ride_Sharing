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
  createdAt: string;
  date: string;
  destinationId: string;
  destinationName: string;
  driver: {
    firstName: string;
    lastName: string;
  };
  endTime: string;
  etherCost: number;
  numberOfAvailableSeats: number;
  numberOfSeats: number;
  rideBooked: boolean;
  riders: any[];
  sourceId: string;
  sourceName: string;
  startTime: string;
  time: string;
  transactionIds: any[];
  updatedAt: string;
  vehicle: any;
  __v: number;
}

const BookComponent: React.FC<{ ride: Ride }> = ({ ride }) => {
  const router = useRouter();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    toast.success("Moving to booking page");
    router.push(`/book/${id}`);
  };

  const moment1 = moment(ride.startTime);
  const moment2 = moment(ride.endTime);
  const differenceInMinutes = moment2.diff(moment1, 'minutes');

  // Convert the difference into hours and minutes
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;
  
  // Format the result as hh:mm
  const formattedDifference = `${hours}h ${minutes}min`;
  
  
  return (
    <>
      <div className="m-[40px]   border-[#7c7c7c] flex flex-col gap-[30px] h-[200px] rounded-[20px] cursor-pointer py-[20px] px-[10px] shadow-md hover:shadow-lg transition duration-300">
        <div className="flex justify-between">
          <div className="flex gap-[20px] items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div>
                {ride.driver.firstName}&nbsp;{ride.driver.lastName}
              </div>
              <div className="flex justify-between items-center gap-[5px]">
                <IoStar />
                <span className="w-full text-left">4.8</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[5px] justify-center">
            <FaEthereum />
            <div>{ride.etherCost}</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px] h-[80px]">
            <div className="flex flex-col justify-between items-center">
              <div>{moment(ride.startTime).format("h:mm a")}</div>
              <div className="text-[12px]">{formattedDifference}</div>
              <div>{moment(ride.endTime).format("h:mm a")}</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCircle />
              <div className="h-[65%] w-[5px] bg-[#000]"></div>
              <FaRegCircle />
            </div>
            <div className="flex flex-col items-center justify-between">
              <div>{ride.sourceName}</div>
              <div className="text-left w-full">{ride.destinationName}</div>
            </div>
          </div>
          <Button variant="outline" onClick={(e) => handleSubmit(e, ride._id)}>
            Book Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookComponent;
