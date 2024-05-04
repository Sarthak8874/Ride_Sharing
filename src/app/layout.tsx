"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  Navbar  from "@/components/Navbar";
import "./globals.css";
// import { ToastContainer } from 'react-toastify';
import {ToastContainer } from "react-toastify";
import { UserProvider } from "@/utils/UserProvider";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          
      <ToastContainer position="top-right" />
        <Navbar />
        {children}
        </UserProvider>
      </body>
    </html>
  );
}


