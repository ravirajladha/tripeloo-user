import axiosInstance from "@/utils/axios";
import { setUser } from "@/store/slice/authSlice";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const loginUser = async (email: string, password: string, dispatch: any) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/api/v1/users/login`, {
      email,
      password,
      type: "user", // Explicitly set type
    }, { withCredentials: true });

    if (response.data.success) {
      // ✅ Store user in Redux
      dispatch(setUser(response.data.user));

      // ✅ Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return { success: true, user: response.data.user };
    }
  } catch (error: any) {
    return { success: false, error: error.response?.data?.error || "Invalid email or password" };
  }
};
