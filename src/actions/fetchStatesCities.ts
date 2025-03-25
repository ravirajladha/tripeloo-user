// Inside your actions folder, add a new file like "fetchStatesCities.ts"
import axiosInstance from "@/utils/axios"; // Ensure you're using the axiosInstance for API calls

export const fetchStatesAndCities = async () => {
  try {

    const token = localStorage.getItem('accessToken'); 
    const response = await axiosInstance.get("/api/v1/stay/getStatesAndCities", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, 
    
    });

    // const response = await axiosInstance.get("/api/v1/stay/states-cities"); // Adjust the URL if needed
    console.log(response.data, "inside the fetchstatecities");
    return response.data; // Return the states and cities
  } catch (error: any) {
    console.error("Error fetching states and cities:", error);
    throw error.response?.data || error.message;
  }
};
