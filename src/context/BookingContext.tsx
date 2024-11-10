// context/BookingContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface BookingData {
  rideDate: string;
  fromCity: string;
  toCity: string;
  Driver: string;
  distance: string;
  date : string;
}

interface BookingContextProps {
  bookingDataa: BookingData | null;
  setBookingDataa: (data: BookingData) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingDataa, setBookingDataa] = useState<BookingData | null>(null);

  return (
    <BookingContext.Provider value={{ bookingDataa, setBookingDataa }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};