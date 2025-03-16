import axiosInstance from "@/utils/axios"; // ✅ Use axiosInstance instead of plain axios
const token = localStorage.getItem('accessToken'); // Get token from localStorage

export const fetchAllStays = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/stay/allStays", {

      headers: { Authorization: `Bearer ${token}` },

      withCredentials: true, // Ensure credentials (cookies) are included
    });
    return response.data.stays; // ✅ Return stays array
  } catch (error: any) {
    console.error("Error fetching stays:", error.response?.data || error.message || error);
    throw error.response?.data || error.message;
  }
};


// const token = localStorage.getItem('accessToken'); // Get token from localStorage
// const response = await axiosInstance.get("/api/v1/stay/all", {
//   headers: { Authorization: `Bearer ${token}` },
//   withCredentials: true, // Ensure credentials (cookies) are included
// });


