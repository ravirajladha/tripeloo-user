import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createBooking = async (bookingData: any) => {
  // checkAuthStatus(); 

  // ✅ Check user authentication before making API call
console.log(bookingData, "response being sent for booking")
  try {
    const token = localStorage.getItem('accessToken'); 

    
    const response = await axios.post(`${BACKEND_URL}/api/v1/booking`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // ✅ Ensure credentials are included
    });
    return response.data;
  } catch (error: any) {
    console.error("Booking API Error:", error.response?.data || error);
    throw error.response?.data || error.message;
  }
};
