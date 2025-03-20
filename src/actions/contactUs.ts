import axiosInstance from "@/utils/axios"; // ✅ Use axiosInstance instead of plain axios

export const sendMessage = async (data: { name: string, email: string, message: string }) => {
  try {
    const token = localStorage.getItem("accessToken"); // ✅ Get token inside the function

    // Send the message with the token in the header
    const response = await axiosInstance.post('/api/v1/helper/contact-us', data, {
      headers: { Authorization: `Bearer ${token}` }, // Add Authorization header with token
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error sending message:', error.response?.data || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to send message");
  }
};
