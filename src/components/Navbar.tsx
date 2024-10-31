/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { UserContext } from "@/utils/UserProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const { token, updateToken, setUserData } = React.useContext(UserContext);
  const router = useRouter();
  const handleButtonClick = (text: string) => {
    router.push(`/${text}`);
  };
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        updateToken(token);
      }
    }
  }, [token]);
  const handleLogout = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("username");
      toast.success("Logged Out successfully!!");
      updateToken("");
      setUserData(null);
      router.push("/");
      // reload the page
      window.location.reload();
    }
  };

  return (
    <nav className="inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            <MountainIcon />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/search"
            >
              Search
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/publish"
            >
              Publish
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/register/vehicle"
            >
              Register Vehicle
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {token !== "" && (
              <Button onClick={() => handleLogout()}>Sign Out</Button>
            )}
            {token === "" && (
              <>
                <Button onClick={() => handleButtonClick("signin")}>
                  Sign in
                </Button>
                <Button onClick={() => handleButtonClick("signup")}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
