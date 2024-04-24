"use client";
import React from "react";
import { Label } from "@/components/ui/label";
// import { Label } from "../ui/label";
import { Input } from "@/components/ui/inputA";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="sm:h-auto w-full md:h-[100vh] flex justify-center items-center ">
      
      <div className="flex flex-wrap md:w-[700px] lg:w-full lg:h-[100vh] lg:mt-[0px] md:h-auto md:mt-[400px] p-4 justify-center items-center gap-10">
        <div className="max-w-md  border-yellow-400 border-4 z-[100] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Get In Touch With Us
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Reach out to us with any inquiries, feedback, or collaboration opportunities - we're eager to hear from you!
        </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Durden" type="text" />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Textarea
                className="mb-4 flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
              file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
              focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
               disabled:cursor-not-allowed disabled:opacity-50
               dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
               group-hover/input:shadow-none transition duration-400"
                placeholder="Type your message here."
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Contact Us &rarr;
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
        <div>
          <Image
            alt="person-image"
            src="/Images/person-service.png"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactForm;

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
