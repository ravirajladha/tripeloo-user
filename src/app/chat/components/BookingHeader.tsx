import React from "react";

interface BookingHeaderProps {
  bookingId: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ bookingId }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
      <h2 className="text-lg font-semibold">Booking Details</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Booking ID: {bookingId}</p>
    </div>
  );
};

export default BookingHeader;
