"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
// import { Label } from "../ui/label";
import { Input } from "@/components/ui/inputA";
import { cn } from "@/utils/cn";
import {
	IconBrandGithub,
	IconBrandGoogle,
	IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";

export function RegisterVehicle() {

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
		
		axios
        .post(`${process.env.NEXT_PUBLIC_URL}/vehicle/register`,formData, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        })
        .then((res) => {
		  console.log(res.data);
		  toast.success("Registered Successfully");
        })
        .catch((e) =>
		{
			console.log(e);
			toast.error("Registration Failed");
		}); 
    };

	const [formData, setFormData] =useState({
		username: "",
		name:"Temp",
		vehicleNumber: "",
		vehicleImg: null,
		idProof: null,
		vehicleModel: "Maruti",
		vehicleRc: null,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev:any) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	}

	return (
		<div className="sm:h-auto  w-full min-h-[100vh] md:h-[100vh] flex justify-center items-center mx-auto ">
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Register Your Vehicle
				</h2>
				{/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to aceternity if you can because we don&apos;t have a login flow
          yet
        </p> */}

				<form className="my-8" onSubmit={handleSubmit}>
					<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
						<LabelInputContainer>
							<Label htmlFor="username">
								Registered Username
							</Label>
							<Input
								id="username"
								placeholder="Tyler"
								type="text"
								onChange={handleChange}
								value={formData.username}
							/>
						</LabelInputContainer>
					</div>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="vehicleNumber">Vehicle Number</Label>
						<Input
							id="vehicleNumber"
							placeholder="--"
							type="text"
							onChange={handleChange}
							value={formData.vehicleNumber}
						/>
					</LabelInputContainer>

					<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
						<Label htmlFor="picture">Vehicle Image</Label>
						<Input id="picture" type="file"  />

					</div>

					<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
						<Label htmlFor="picture">
							Aadhar Card / DL / PAN Card
						</Label>
						<Input id="picture" type="file" />
					</div>

					<div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
						<Label htmlFor="picture">Vehicle RC</Label>
						<Input id="picture" type="file" />
					</div>

					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						Register &rarr;
						<BottomGradient />
					</button>

					<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
				</form>
			</div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};

export default RegisterVehicle;
