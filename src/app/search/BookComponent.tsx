import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEthereum } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const BookComponent = () => {
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
              <div>Ram</div>
              <div className="flex justify-between items-center gap-[5px]">
                <IoStar />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[5px] justify-center">
            <FaEthereum />
            <div>0.05</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px] h-[80px]">
            <div className="flex flex-col justify-between items-center">
              <div>19:00</div>
              <div className="text-[12px]">3h40</div>
              <div>22:00</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCircle />
              <div className="h-[65%] w-[5px] bg-[#000]"></div>
              <FaRegCircle />
            </div>
            <div className="flex flex-col items-center justify-between">
              <div>Kota</div>
              <div>Jaipur</div>
            </div>
          </div>
          <Button variant="outline">Book Now</Button>
        </div>
      </div>
    </>
  );
};

export default BookComponent;
