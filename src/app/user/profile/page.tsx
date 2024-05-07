"use client";
import Profile from "@/components/Profile";
import React, { useState } from "react";
import { useEffect } from "react";



function page() {
  const [user, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProfile() {
      try {
        // Make a request to your backend API to fetch user profile data
        const token = localStorage.getItem("token");
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + "/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ); // Replace '/api/profile' with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data?.data);
        console.log(data?.data);

      } catch (error) {
        // setError(error.message);
        console.log("Error incoming");
      }
    }

    fetchProfile();
  }, []); // Empty dependency array to run this effect only once after initial render

  return (
    <div>
      <Profile {...user} />
    </div>
  );
}

export default page;
