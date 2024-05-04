"use client";
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function page({params: {id: bookId}}: {params: {id: string}}) {
    const [bookingData, setBookingData] = useState({})
    const backendUrl = process.env.NEXT_PUBLIC_URL
    useEffect(() => {
        axios.get(`${backendUrl}/book/${bookId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setBookingData(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
  return (
    <div>page</div>
  )
}
