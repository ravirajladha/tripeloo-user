import axios from 'axios'
// Inside your actions folder, add a new file like "fetchStatesCities.ts"
import axiosInstance from "@/utils/axios"; 
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

async function getUserDetails() {
  const token = localStorage.getItem('accessToken') // Get the token from localStorage

  // If the token exists, add it to the Authorization header

  const response = await axiosInstance.get("/api/v1/users/me", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the request headers
    },
  })
  
  return response.data
}

export default getUserDetails
