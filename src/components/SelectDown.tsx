import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDown(data:any) {
  return (
    <Select >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue   placeholder="Select Vehicle" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup> 
            {data?.data?.length > 0 && 
                data?.data?.map((item:any) => {
                    console.log("item",item)
                    return (
                    <SelectItem value={item._id}>{item.vehicleNumber}</SelectItem>
                    )
                })
            }
            {
                data?.data?.length === 0 && 
                <SelectItem disabled value="1">None</SelectItem>
            }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
