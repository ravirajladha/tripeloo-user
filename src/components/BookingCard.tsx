import React from "react";
import Image from "next/image";
import Link from "next/link";
import StartRating from "@/components/StartRating";

interface BookingCardProps {
  booking: {
    _id: string;
    stay: {
      _id: string;
      title: string;
      images: { url: string }[];
    };
    roomType: {
      name: string;
    };
    numRooms: number;
    numAdults: number;
    numChildren: number;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    createdAt: string;
  };
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    console.log("Booking Data:", booking);

    
  const { stay, roomType, numRooms, numAdults, numChildren, checkIn, checkOut, totalPrice, createdAt } = booking;

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-neutral-900">
      {/* Stay Image with Link */}
      <Link href={`/listing-stay-detail/${stay?._id}`} className="relative w-40 h-40 flex-shrink-0">
        <Image
          src={stay?.images?.[0]?.url || "/placeholder.jpg"}
          alt={stay?.title || "Stay Image"}
          layout="fill"
          className="rounded-lg object-cover"
        />
      </Link>

      {/* Stay Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold hover:text-blue-500">
          <Link href={`/listing-stay-detail/${stay?._id}`}>{stay?.title || "Stay Name"}</Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Room Type: <strong>{roomType?.name || "Room Type Not Available"}</strong>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Guests: <strong>{numAdults} Adults</strong>, <strong>{numChildren} Children</strong>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Rooms Booked: <strong>{numRooms}</strong>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Check-in: <strong>{new Date(checkIn).toLocaleDateString()}</strong> - 
          Check-out: <strong>{new Date(checkOut).toLocaleDateString()}</strong>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Booking Date: {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg font-semibold dark:text-gray-400">
       Amount to be collected:    ₹{totalPrice}
        </p>
        <StartRating reviewCount={5} point={4} />
      </div>
    </div>
  );
};

export default BookingCard;
