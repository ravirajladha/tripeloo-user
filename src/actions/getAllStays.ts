import axiosInstance from "@/utils/axios"; // ✅ Use axiosInstance instead of plain axios

export const fetchAllStays = async () => {
  try {
    if (typeof window === "undefined") return []; // ✅ Prevents execution on the server

    const token = localStorage.getItem('accessToken'); // ✅ Get token inside the function
    const response = await axiosInstance.get("/api/v1/stay/allStays", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // ✅ Ensure credentials (cookies) are included
    });

    return response.data.stays; // ✅ Return stays array
  } catch (error: any) {
    console.error("Error fetching stays:", error.response?.data || error.message || error);
    throw error.response?.data || error.message;
  }
};
