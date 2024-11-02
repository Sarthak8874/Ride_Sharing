import { useState } from "react";

const useBookingState = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  const rideBooking = async (param) => {
    if (!param || !param.bookRide) {
      console.error("Missing booking details.");
      return;
    }

    const { bookRide } = param;
    console.log("Booking Details:", bookRide);
    setBookingDetails(bookRide);
  };

  return { rideBooking, bookingDetails };
};

export { useBookingState };
