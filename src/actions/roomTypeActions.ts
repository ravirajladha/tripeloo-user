// actions/roomTypeActions.ts

import axios from "axios";
import axiosInstance from "@/utils/axios"; // ✅ Use axiosInstance instead of plain axios

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getRoomTypeById = async (roomTypeId: string) => {
  try {



    const token = localStorage.getItem('accessToken'); 


    const response = await axiosInstance.get(`${BACKEND_URL}/api/v1/stay/roomTypes/${roomTypeId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, 
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching room type:", error.response?.data || error);
    throw error.response?.data || error.message;
  }
};