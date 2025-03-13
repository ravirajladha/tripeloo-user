import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(BACKEND_URL);
export const getStayById = async (id:string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/stay/${id}`, {
      withCredentials: true, // Include cookies if required
    });
    console.log(response.data, "data from the actions single stay")
    return response.data; // Return stays array
  } catch (error: any) {
    console.error("Error fetching stays:", error.response?.data || error);
    throw error.response?.data || error.message;
  }
};