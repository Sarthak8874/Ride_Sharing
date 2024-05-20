"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/inputA";
import { cn } from "@/utils/cn";
import { BackgroundBeams } from "./ui/background-beams";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "@/utils/UserProvider";

export function SigninForm() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const {updateToken} = React.useContext(UserContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_URL;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${backendUrl}/user/signin`, {
      emailOrUsername: formData.email,
      password: formData.password,
    }).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.userData) );
      updateToken(res.data.token);
      setFormData({ email: "", password: "" });
      router.push("/");
      toast.success("Logged in successfully", {
        autoClose: 2000
      });
    }).catch((err) => {
      toast.error(err.response?.data?.message, {
        autoClose: 2000
      });
    });
  };
  

  return (
    <div className="w-[350px] md:w-full mx-auto lg:w-full h-[100vh] flex justify-center items-center ">
      <div className="max-w-md z-[100] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back 
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please Sign in to continue
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" onChange={handleChange} placeholder="projectmayhem@fc.com" type="email" required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" onChange={handleChange} placeholder="••••••••" type="password" required />
          </LabelInputContainer>
          

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign in &rarr;
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
      <BackgroundBeams/>
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

export default SigninForm;
