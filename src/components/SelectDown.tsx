import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserVehicleNumbers } from "../utils/Blockchain/UserVehicleNumber/useUserVehicleNumbers";

interface SelectDownProps {
  setVehicleId: (id: string) => void;
  setSelectedIndex: (index: number) => void;
}

export function SelectDown({
  setVehicleId,
  setSelectedIndex,
}: SelectDownProps) {
  const username = localStorage.getItem("username");
  const { fetchVehicleNumbers, vehicleNumbers, loading, error } =
    useUserVehicleNumbers(username);

  React.useEffect(() => {
    if (username) {
      fetchVehicleNumbers();
    }
  }, [username]);

  return (
    <Select
      onValueChange={(value: string) => {
        const index = vehicleNumbers.indexOf(value);
        setVehicleId(value);
        setSelectedIndex(index);
      }}
    >
      <SelectTrigger className="w-[440px] bg-white">
        <SelectValue placeholder="Select Vehicle" />
      </SelectTrigger>

      <SelectContent className="bg-white">
        {loading ? (
          <SelectItem disabled value="loading">
            Loading vehicles...
          </SelectItem>
        ) : error ? (
          <SelectItem disabled value="error">
            Error fetching vehicles
          </SelectItem>
        ) : vehicleNumbers.length > 0 ? (
          vehicleNumbers.map((number, index) => (
            <SelectItem value={number} key={index}>
              {number}
            </SelectItem>
          ))
        ) : (
          <SelectItem disabled value="no-vehicles">
            No vehicles available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
