"use client";
import React from "react";
import { Label } from "@/components/ui/label";
// import { Label } from "../ui/label";
import { Input } from "@/components/ui/inputA";
import { cn } from "@/utils/cn";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(JSON.stringify(formData));
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("password doesn't match");
        // toast.error("password dosen't match", {
        //   autoClose: 2000
        // });
        return;
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            phoneNumber: "",
          });
          router.push("/publish");
          // toast.success("Logged in successfully", {
          //   autoClose: 2000
          // });
        });
    } catch (err) {
      console.error("Error submitting form:", err);
      // toast.error("sign up error", {
      //   autoClose: 2000
      // });
    }
  };

  return (
    <div className="sm:h-auto   w-full md:h-[100vh] flex justify-center items-center ">
      <div className="max-w-md z-[100] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Ride Sharing
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Welcome aboard our blockchain-powered ridesharing platform, where
          every journey is secure, transparent, and tailored just for you!
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                name="firstName"
                placeholder="Tyler"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                name="lastName"
                placeholder="Durden"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Confirm password</Label>
            <Input
              id="twitterpassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="sample_123"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+91-740XX-XXXXX"
              type="number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}

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

export default SignupForm;
