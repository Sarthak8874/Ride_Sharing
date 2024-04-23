"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/inputA";
import { DatePickerDemo } from "./Datepicker";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Map from "./g";


const page = () => {
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [passengers, setPassengers] = React.useState<string>();

  return (
    <>
      {/* <div className="flex h-full"> */}
      <div className="flex bg-[#11184b] px-[80px] py-[40px] flex-row justify-between items-center">
        <Input
          value={source}
          onChange={(e) => setSource(e?.target?.value)}
          placeholder="From"
        />
        <Input
          value={destination}
          onChange={(e) => setDestination(e?.target?.value)}
          placeholder="to"
        />
        <DatePickerDemo />
        <Input
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e?.target?.value)}
          placeholder="Passengers"
        />
        <Button variant="outline">Search</Button>
      </div>
      <Map/>
      {/* </div> */}
    </>
  );
};

export default page;
