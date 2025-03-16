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
    status:string;
  };
}

// ✅ Function to determine status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-500 bg-yellow-100"; // 🟡 Yellow
    case "confirmed":
      return "text-green-600 bg-green-100"; // 🟢 Green
    case "cancelled":
      return "text-red-600 bg-red-100"; // 🔴 Red
    case "completed":
      return "text-blue-500 bg-blue-100"; // 🔵 Blue
    default:
      return "text-gray-500 bg-gray-100"; // Default (Gray)
  }
};


const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    console.log("Booking Data:", booking);

    
  const { stay, roomType, numRooms, numAdults, numChildren, checkIn, checkOut, totalPrice, createdAt ,status} = booking;

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
         <p className="text-lg font-semibold dark:text-gray-400">

          ✅ Booking Status:   
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize first letter */}
        </span>
        </p>       

        <StartRating reviewCount={5} point={4} />
        <Link href={`/chat/${booking._id}`} passHref>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Go to Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;
