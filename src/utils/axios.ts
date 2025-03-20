import axios from "axios";
import { store } from "@/store/store"; // Import Redux store
import { clearUser, setUser } from "@/store/slice/authSlice";
import { refreshAccessToken } from "@/store/slice/authSlice"; // Import refresh token action

// Create Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Use NEXT_PUBLIC_ for frontend env variables
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add Interceptor to Attach Access Token & User Type
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken"); // Get access token from localStorage
    const userType = store.getState().auth.user?.type || "user"; // Default to "user" if no user type is found

    // Attach Authorization header if token is available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach User Type in headers if available
    if (userType) {
      config.headers["X-User-Type"] = userType; // Attach user type in headers
    }

    // console.log("🚀 Axios Request Headers:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Errors - Token Expiry and Refresh Logic
axiosInstance.interceptors.response.use(
  (response) => response, // Return response normally if it's successful
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("🔄 Token expired, attempting refresh...");

      try {
        // Attempt to refresh the token
        const res = await store.dispatch(refreshAccessToken()).unwrap();
        console.log("✅ Access token refreshed:", res.accessToken);

        // Update Authorization header with the new token
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;

        // Retry the original request with the new access token
        return axiosInstance.request(error.config);
      } catch (err) {
        console.error("⛔ Refresh failed, logging out...");
        
        // Clear the user and tokens from Redux and localStorage
        store.dispatch(clearUser());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirect to the login page
        window.location.href = "/login";
      }
    }
    // Reject the error if it's not 401
    return Promise.reject(error);
  }
);

export default axiosInstance;
