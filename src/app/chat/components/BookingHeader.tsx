// components/BookingHeader.tsx

import React from "react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary"; // Assuming you have a reusable button component

interface BookingHeaderProps {
  bookingId: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ bookingId }) => {
  const router = useRouter();

  // Function to navigate to the bookings page
  const handleViewBookings = () => {
    router.push("/booking");
  };

  // Function to navigate to the stays page
  const handleExploreStays = () => {
    router.push("/listing-stay");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
      <h2 className="text-lg font-semibold">Booking Details</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Booking ID: {bookingId}</p>
      <span className="text-sm">
        Please chat with the travel provider and ask for any doubts! Travel provider will accept your request soon. Thank you!
      </span>
      <div className="mt-4 flex space-x-3">
        <ButtonPrimary
          onClick={handleViewBookings}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          View Bookings
        </ButtonPrimary>
        <ButtonPrimary
          onClick={handleExploreStays}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Explore Stays
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default BookingHeader;