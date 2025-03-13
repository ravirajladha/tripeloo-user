"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import { useAppSelector } from "@/store/hook"; // Import Redux hooks
import { createBooking } from "@/actions/bookingActions"; // Centralized booking API function

const CheckOutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user); // Fetch user from Redux store
// console.log(user, "")
  // Extract details from query params
  const roomTypeId = searchParams.get("roomTypeId");
  const numRooms = Number(searchParams.get("numRooms")) || 1;
  const numAdults = Number(searchParams.get("numAdults")) || 1;
  const numChildren = Number(searchParams.get("numChildren")) || 0;
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const totalPrice = Number(searchParams.get("totalPrice")) || 0;

  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!user || !user._id) {
      alert("Please log in to proceed with booking.");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        user_id: user._id, // Fetch user ID from Redux store
        roomTypeId,
        numRooms,
        numAdults,
        numChildren,
        startDate,
        endDate,
        totalPrice,
        userMessage,
      };

      await createBooking(bookingData); // Call centralized booking function
      alert("Booking Confirmed!");
      router.push("/"); // Redirect after successful booking
    } catch (error) {
      console.error("Booking Error", error);
      alert("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-11 mb-24 lg:mb-32 flex flex-col lg:flex-row">
      {/* LEFT: Booking Summary */}
      <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10">
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold">Confirm Your Booking</h2>
          <div className="mt-4 border-b pb-4">
            <p className="text-lg font-medium">Room Type: {roomTypeId}</p>
            <p className="text-lg font-medium">
              Guests: {numAdults} Adults, {numChildren} Children
            </p>
            <p className="text-lg font-medium">Rooms: {numRooms}</p>
            <p className="text-lg font-medium">
              Dates: {startDate} to {endDate}
            </p>
            <p className="text-lg font-semibold text-blue-600">
              Total Price: ₹{totalPrice}
            </p>
          </div>

          <div className="mt-6">
            <Label>Special Request</Label>
            <Textarea
              placeholder="Any special requests? (Optional)"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </div>

          <ButtonPrimary onClick={handleConfirmBooking} disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </ButtonPrimary>
        </div>
      </div>

      {/* RIGHT: Room Details */}
      <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3 border rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <Image
            src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Room"
            width={100}
            height={80}
            className="rounded-lg"
          />
          <div>
            <p className="text-xl font-medium">Selected Room</p>
            <StartRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
