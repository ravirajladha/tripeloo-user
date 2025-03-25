// pages/checkout.tsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import { useAppSelector } from "@/store/hook"; // Import Redux hooks
import { createBooking } from "@/actions/bookingActions"; // Centralized booking API function
import { getRoomTypeById } from "@/actions/roomTypeActions"; // New function to fetch room type

const CheckOutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user); // Fetch user from Redux store

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
  const [roomType, setRoomType] = useState<any>(null);
  const [stay, setStay] = useState<any>(null);
  const [overallRating, setOverallRating] = useState<{
    average_rating: number;
    total_reviews: number;
  }>({ average_rating: 0, total_reviews: 0 });
  const [error, setError] = useState<string | null>(null);

  // Fetch room type details
  useEffect(() => {
    const fetchRoomType = async () => {
      if (!roomTypeId) return;

      try {
        const response = await getRoomTypeById(roomTypeId);
        if (response.success) {
          setRoomType(response.data.roomType);
          setStay(response.data.stay);
          setOverallRating(
            response.data.overallRating || { average_rating: 0, total_reviews: 0 }
          );
        } else {
          throw new Error(response.message || "Failed to fetch room type");
        }
      } catch (err: any) {
        console.error("Error fetching room type:", err);
        setError(err.message || "Failed to fetch room type details");
      }
    };

    fetchRoomType();
  }, [roomTypeId]);

  // Format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

      const response = await createBooking(bookingData); // Call centralized booking function
      alert("Booking Confirmed!");

      // Redirect to chat page with bookingId
      const bookingId = response.booking_id;
      router.push(`/chat/${bookingId}`);
    } catch (error: any) {
      console.error("Booking Error:", error);
      alert(error.message || "Booking failed. Try again.");
      setLoading(false);
    }
  };

  if (error) return <div className="container mt-11 mb-24">Error: {error}</div>;

  return (
    <div className="container mt-11 mb-24 lg:mb-32 flex flex-col lg:flex-row">
      {/* LEFT: Booking Summary */}
      <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10">
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold">Confirm Your Booking</h2>
          <div className="mt-4 border-b pb-4 space-y-2">
            {stay && (
              <p className="text-lg font-medium">
                Stay: {stay.title} ({stay.city_name})
              </p>
            )}
            <p className="text-lg font-medium">
              Room Type: {roomType?.title || roomTypeId}
            </p>
            <p className="text-lg font-medium">
              Guests: {numAdults} Adults, {numChildren} Children
            </p>
            <p className="text-lg font-medium">Rooms: {numRooms}</p>
            <p className="text-lg font-medium">
              Dates: {formatDate(startDate)} to {formatDate(endDate)}
            </p>
            <p className="text-lg font-semibold text-blue-600">
              Total Price: ₹{totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <Label>Special Request</Label>
            <Textarea
              placeholder="Any special requests? (Optional)"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="mt-1"
            />
          </div>

          <ButtonPrimary
            onClick={handleConfirmBooking}
            disabled={loading}
            className="mt-6 bg-red-600 hover:bg-red-700"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </ButtonPrimary>
        </div>
      </div>

      {/* RIGHT: Room Details */}
      <div className="w-full lg:w-2/5 xl:w-1/3 border rounded-lg shadow-lg p-6 mt-6 lg:mt-0">
        <div className="flex items-start space-x-4">
          <Image
            src={
              roomType?.images?.[0]?.url ||
              "https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
            alt="Room"
            width={100}
            height={80}
            className="rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-xl font-medium">Selected Room</p>
            <StartRating
              point={overallRating.average_rating}
              reviewCount={overallRating.total_reviews}
              className="mt-1"
            />
            {roomType && (
              <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                <p>Beds: {roomType.beds || "N/A"}</p>
                <p>Bedrooms: {roomType.bedrooms || "N/A"}</p>
                <p>Baths: {roomType.baths || "N/A"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;