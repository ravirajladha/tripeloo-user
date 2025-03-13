// import axios from 'axios';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// console.log(BACKEND_URL);
// export const fetchAllStays = async () => {
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/stay/all`, {
//       withCredentials: true, // Include cookies if required
//     });
//     return response.data.stays; // Return stays array
//   } catch (error: any) {
//     console.error("Error fetching stays:", error.response?.data || error);
//     throw error.response?.data || error.message;
//   }
// };





import axiosInstance from "@/utils/axios"; // ✅ Use axiosInstance instead of plain axios

export const fetchAllStays = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/stay/all");
    return response.data.stays; // ✅ Return stays array
  } catch (error: any) {
    console.error("Error fetching stays:", error.response?.data || error);
    throw error.response?.data || error.message;
  }
};
