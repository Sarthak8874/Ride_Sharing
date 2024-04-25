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

import RequestTables from '@/components/RequestTables'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPortal() {
	const [requests, setRequests] = useState([
		{
			id: 1,
			userId: "user1",
			document: "document1.jpg",
			status: "pending",
		},
		{
			id: 2,
			userId: "user2",
			document: "document2.jpg",
			status: "pending",
		},
		{
			id: 3,
			userId: "user3",
			document: "document3.jpg",
			status: "pending",
		},
	]);

	const handleVerify = (requestId: number, status: string) => {
		const updatedRequests = requests.map((request) =>
			request.id === requestId ? { ...request, status } : request
		);
		setRequests(updatedRequests);
	};

	return (
		<Tabs defaultValue="account" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="pending">Pending</TabsTrigger>
				<TabsTrigger value="approved">Approved</TabsTrigger>
				<TabsTrigger value="rejected">Rejected</TabsTrigger>
			</TabsList>
			<TabsContent value="pending">
				<Card>
					<CardHeader>
						<CardTitle>All Requests</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when
							you're done.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="name">Name</Label>
							<Input id="name" defaultValue="Pedro Duarte" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input id="username" defaultValue="@peduarte" />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save changes</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="approved">
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be
							logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="current">Current password</Label>
							<Input id="current" type="password" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="new">New password</Label>
							<Input id="new" type="password" />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="rejected">
				<Card>
          <CardHeader>
            <CardTitle>Rejected Requests</CardTitle>
            <CardDescription>
              View all rejected requests here.
            </CardDescription>
          </CardHeader>
					{/* <table>
						<thead>
							<tr>
								<th>User ID</th>
								<th>Document</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{requests.map((request) => (
								<tr key={request.id}>
									<td>{request.userId}</td>
									<td>{request.document}</td>
									<td>{request.status}</td>
									<td>
										<button
											onClick={() =>
												handleVerify(
													request.id,
													"approved"
												)
											}
										>
											Approve
										</button>
										<button
											onClick={() =>
												handleVerify(
													request.id,
													"rejected"
												)
											}
										>
											Reject
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table> */}
          <RequestTables/>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
