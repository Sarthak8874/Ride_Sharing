"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

function OurServices() {
    return (
        <div>
            <h2 className="text-2xl text-center mx-auto font-bold text-blue-500 ">Our Services</h2>
            <div className="flex flex-wrap  gap-10 mx-auto items-center justify-center">
                <CardContainer className="inter-var ">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-black dark:text-white"
                        >
                            Seamless Ride Booking

                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Experience hassle-free ride booking with our intuitive platform. Whether you need a quick ride across town or a longer trip, our user-friendly interface makes it easy to find the perfect ride to suit your needs.
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/Images/person-ride.png"
                                height="100"
                                width="100"
                                className="h-60 scale-75 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        {/* <div className="flex justify-between items-center mt-20">
                        <CardItem
                            translateZ={20}
                            as={Link}
                            href="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                            Try now →
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            as="button"
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                            Sign up
                        </CardItem>
                    </div> */}
                    </CardBody>
                </CardContainer>

                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-black dark:text-white"
                        >
                            Secure Payments with Blockchain

                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Say goodbye to worries about payment security. Our platform utilizes blockchain technology to ensure that every transaction is transparent, tamper-proof, and securely processed. Your financial information remains protected at all times.
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/Images/security.png"
                                height="800"
                                width="800"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                    </CardBody>
                </CardContainer>

                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-black dark:text-white"
                        >
                            Smart Contract Integration

                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Our smart contract integration automates key aspects of the ride-sharing process, such as fare calculation and payment distribution. This ensures that transactions are executed efficiently and fairly, without the need for intermediaries.
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/Images/contract.png"
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        {/* <div className="flex justify-between items-center mt-20">
                        <CardItem
                            translateZ={20}
                            as={Link}
                            href="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                            Try now →
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            as="button"
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                            Sign up
                        </CardItem>
                    </div> */}
                    </CardBody>
                </CardContainer>
            </div>
        </div>
    )
}

export default OurServices