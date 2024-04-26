"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import RequestTables from "@/components/RequestTables";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

	return (
		<Tabs defaultValue="pending" className="w-full p-10">
			<TabsList className="grid w-full grid-cols-3" >
				<TabsTrigger value="pending">Pending</TabsTrigger>
				<TabsTrigger value="approved">Approved</TabsTrigger>
				<TabsTrigger value="rejected">Rejected</TabsTrigger>
			</TabsList>
			<TabsContent value="pending">
				<Card className="px-10 py-4">
					<CardHeader>
						<CardTitle>All Requests</CardTitle>
						<CardDescription>
							View all requests here.
						</CardDescription>
					</CardHeader>

					<RequestTables
						val={"pending"}
						req={requests}
						setReq={setRequests}
					/>
				</Card>
			</TabsContent>
			<TabsContent value="approved">
				<Card className="px-10 py-4">
					<CardHeader>
						<CardTitle>Approved Requests</CardTitle>
						<CardDescription>
							View all approved requests here.
						</CardDescription>
					</CardHeader>

					<RequestTables
						val={"approved"}
						req={requests}
						setReq={setRequests}
					/>
				</Card>
			</TabsContent>
			<TabsContent value="rejected">
				<Card className="px-10 py-4">
					<CardHeader>
						<CardTitle>Rejected Requests</CardTitle>
						<CardDescription>
							View all rejected requests here.
						</CardDescription>
					</CardHeader>

					<RequestTables
						val={"rejected"}
						req={requests}
						setReq={setRequests}
					/>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default AdminPortal;

