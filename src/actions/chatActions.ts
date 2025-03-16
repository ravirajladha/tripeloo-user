import axiosInstance from "@/utils/axios";

// ✅ Fetch chat messages for a specific booking
export const fetchChatMessages = async (bookingId: string) => {
  try {
    if (typeof window === "undefined") return []; // ✅ Prevents SSR error

    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function

    const response = await axiosInstance.get(`/api/v1/chat/booking/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // ✅ Ensure credentials are included
    });

    return response.data; // ✅ Return chat messages & user details
  } catch (error: any) {
    console.error("❌ Error fetching chat:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// ✅ Send a message in the chat
export const sendMessage = async (bookingId: string, senderId: string, receiverId: string, message: string) => {
  try {
    if (typeof window === "undefined") return null; // ✅ Prevent SSR errors

    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function

    const response = await axiosInstance.post(
      `/api/v1/chat/booking/${bookingId}/send`,
      { sender_id: senderId, receiver_id: receiverId, message },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    return response.data.newMessage; // ✅ Return new message
  } catch (error: any) {
    console.error("❌ Error sending message:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// ✅ Mark messages as read
export const markMessagesAsRead = async (bookingId: string, userId: string) => {
  try {
    if (typeof window === "undefined") return null; // ✅ Prevent SSR errors

    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function

    const response = await axiosInstance.put(
      `/api/v1/chat/booking/${bookingId}/read`,
      { userId },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    console.log("✅ Messages marked as read:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error marking messages as read:", error.response?.data || error.message);
  }
};
