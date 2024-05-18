import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEthereum } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import  moment from 'moment';


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
    toast.success("Moving to booking page")
    router.push(`/book/${id}`);
  };

  const calculateTimeDifference = (startTime: string, endTime: string): string => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    
    const startDate = new Date(0, 0, 0, startHours, startMinutes);
    const endDate = new Date(0, 0, 0, endHours, endMinutes);
  
    let diff = (endDate.getTime() - startDate.getTime()) / 1000; // difference in seconds
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60);
    
    return `${hours}h ${minutes}m`;
  };
  // Define two dates
const date1 = moment('2023-05-18T12:00:00'); // Format: YYYY-MM-DDTHH:mm:ss
const date2 = moment('2023-05-18T15:30:00');

// Calculate the difference in various units
const diffInMinutes = date2.diff(date1, 'minutes'); // Difference in minutes
const diffInHours = date2.diff(date1, 'hours'); // Difference in hours
const diffInDays = date2.diff(date1, 'days'); // Difference in days

// Output the differences
console.log(`Difference in minutes: ${diffInMinutes} minutes`);
console.log(`Difference in hours: ${diffInHours} hours`);
console.log(`Difference in days: ${diffInDays} days`);
  const timeDifference = calculateTimeDifference(ride.startTime, ride.endTime);
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
              <div>{ride.driver.firstName}&nbsp;{ride.driver.lastName}</div>
              <div className="flex justify-between items-center gap-[5px]">
                <IoStar />
                <span>4.8</span>
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
              <div>{moment(ride.startTime).format('h:mm a')}</div>
              <div className="text-[12px]">{}</div>
              <div>{moment(ride.endTime).format('h:mm a')}</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCircle />
              <div className="h-[65%] w-[5px] bg-[#000]"></div>
              <FaRegCircle />
            </div>
            <div className="flex flex-col items-center justify-between">
              <div>{ride.sourceName}</div>
              <div>{ride.destinationName}</div>
            </div>
          </div>
          <Button variant="outline" onClick={(e)=>handleSubmit(e, ride._id)}>Book Now</Button>
        </div>
      </div>
    </>
  );
};

export default BookComponent;
