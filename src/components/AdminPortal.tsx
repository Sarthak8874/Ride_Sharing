"use client";
import { use, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";


import React, { useEffect } from "react";
import RequestTables from "@/components/RequestTables";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserContext } from "@/utils/UserProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
	{
		id: 1,
		username: "user1",
		document: "document1.jpg",
		status: "pending",
	},
	{
		id: 2,
		username: "user2",
		document: "document2.jpg",
		status: "pending",
	},
	{
		id: 3,
		username: "user3",
		document: "document3.jpg",
		status: "pending",
	},
	{
		id: 4,
		username: "user4",
		document: "document4.jpg",
		status: "rejected",
	},
	{
		id: 5,
		username: "user5",
		document: "document5.jpg",
		status: "rejected",
	},
];

const AdminPortal: React.FC = () => {
	const [requests, setRequests] = useState(data);
	const {vehicles, setVehicles,fetchVehicles} =React.useContext(UserContext);

	

	console.log("admin",vehicles);

	return (
		<Tabs defaultValue="Pending" className="w-full p-10">
			<TabsList className="grid w-full grid-cols-3" >
				<TabsTrigger value="Pending">Pending</TabsTrigger>
				<TabsTrigger value="Approved">Approved</TabsTrigger>
				<TabsTrigger value="Rejected">Rejected</TabsTrigger>
			</TabsList>
			<TabsContent value="Pending">
				<Card className="px-10 py-4">
					<CardHeader>
						<CardTitle>All Requests</CardTitle>
						<CardDescription>
							View all requests here.
						</CardDescription>
					</CardHeader>

					<RequestTables
						val={"Pending"}
						// req={vehicles}
						// setReq={setRequests}
					/>
				</Card>
			</TabsContent>
			<TabsContent value="Approved">
				<Card className="px-10 py-4">
					<CardHeader>
						<CardTitle>Approved Requests</CardTitle>
						<CardDescription>
							View all approved requests here.
						</CardDescription>
					</CardHeader>

					<RequestTables
						val={"Approved"}
						// req={vehicles}
						// setReq={setRequests}
					/>
				</Card>
			</TabsContent>
			<TabsContent value="Rejected">
				<Card className="px-10 py-4">
					<CardHeader>
						<CardTitle>Rejected Requests</CardTitle>
						<CardDescription>
							View all rejected requests here.
						</CardDescription>
					</CardHeader>

					<RequestTables
						val={"Rejected"}
						// req={vehicles}
						// setReq={setRequests}
					/>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default AdminPortal;

