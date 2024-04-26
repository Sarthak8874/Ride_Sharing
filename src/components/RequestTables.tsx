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

type Request = {
	id: number;
	username: string;
	document: string;
	status: string;
};

type Props = {
	val: string;
	req: Request[];
	setReq: React.Dispatch<React.SetStateAction<Request[]>>;
};

const Form: React.FC<Props> = ({ val, req, setReq }) => {
	// const [requests, setRequests] = useState(req.filter((request) => request.status === val));
	const requests = req.filter((request) => request.status === val);
	// console.log(requests);

	const handleVerify = (requestId: number, status: string) => {
		const updatedRequests = req.map((request) =>
			request.id === requestId ? { ...request, status } : request
		);
		setReq(updatedRequests);
	};

	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px] font-bold">ID</TableHead>
					<TableHead className=" w-[250px] font-bold">Username</TableHead>
					<TableHead className="w-[300px] font-bold">Document</TableHead>
					<TableHead className="w-[150px] text-center font-bold">Status</TableHead>
					<TableHead className="w-[350px] text-center font-bold ">
						Actions
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request) => (
					<TableRow key={request.id}>
						<TableCell className="font-medium">
							{request.id}
						</TableCell>
						<TableCell>{request.username}</TableCell>
						<TableCell>{request.document}</TableCell>
						<TableCell className="text-center">
							{request.status}
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
