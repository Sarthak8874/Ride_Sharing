import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export function SelectDown({ data, setVehicleId }: { data: any; setVehicleId: any }) {
  return (
    <Select onValueChange={(value) => {
      setVehicleId(value);
    }}>
      <SelectTrigger className="w-[440px]  bg-white">
        <SelectValue placeholder="Select Vehicle" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {data?.length > 0 &&
            data.map((item: any) => {
              return (
                <SelectItem value={item._id} key={item._id}>
                  {item.vehicleNumber}
                </SelectItem>
              );
            })}
          {data?.length === 0 && <SelectItem disabled value="1">None</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
