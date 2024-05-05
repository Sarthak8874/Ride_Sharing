"use-client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/utils/UserProvider";
import React, { useEffect } from "react";

// type Request = {
// 	id: number;
// 	username: string;
// 	document: string;
// 	status: string;
// };

type Props = {
	val: string;
	// req: Request[];
	// setReq: React.Dispatch<React.SetStateAction<Request[]>>;
};

const Form: React.FC<Props> = ({ val}) => {
	// const [requests, setRequests] = useState(req.filter((request) => request.status === val));
	// const requests = req.filter((request) => request.status === val);
	// console.log(requests);
	
	
	const {vehicles, setVehicles,fetchVehicles} =React.useContext(UserContext);

	useEffect(() => {
		fetchVehicles();
	}, []);
	
	const requests = vehicles.filter((request:any) => request.approvedStatus === val);
	console.log(requests);

	const handleVerify = (requestId: number, status: string) => {
		const updatedRequests = vehicles.map((request:any) =>
			request.id === requestId ? { ...request, status } : request
		);
		setVehicles(updatedRequests);
	};

	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					{/* <TableHead className=" font-bold">ID</TableHead> */}
					<TableHead className="font-bold">Username</TableHead>
					<TableHead className=" font-bold">Vehicle Number</TableHead>
					<TableHead className=" font-bold">Vehicle Model</TableHead>
					<TableHead className=" font-bold">Owner Name</TableHead>
					<TableHead className="font-bold">Document</TableHead>
					<TableHead className=" text-center font-bold">Status</TableHead>
					<TableHead className=" text-center font-bold ">
						Actions
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request:any) => (
					<TableRow key={request.id}>
						{/* <TableCell className="font-medium">
							-
						</TableCell> */}
						<TableCell>{request.ownerUsername}</TableCell>
						<TableCell>{request.vehicleNumber}</TableCell>
						<TableCell>{request.vehicleModel}</TableCell>
						<TableCell>{request.ownerName}</TableCell>
						<TableCell>
							<a href={request.ownerIdProof} target="_blank" className=" text-blue-400 underline">Image link</a>
						</TableCell>
						<TableCell className="text-center">
							{request.approvedStatus}
						</TableCell>
						<TableCell className="flex justify-center gap-4">
							{val != "approved" && (
								<Button
									onClick={() =>
										handleVerify(request.id, "approved")
									}
								>
									Approve
								</Button>
							)}
							{val != "rejected" && (
								<Button
									onClick={() =>
										handleVerify(request.id, "rejected")
									}
								>
									Reject
								</Button>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			{/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
		</Table>
	);
};

export default Form;
