import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  fullName: string;
  email: string;
  address?: string;
  type: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  isLoginModalOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isLoginModalOpen: false,
};

// ✅ Refresh Access Token API Call
export const refreshAccessToken = createAsyncThunk<
  { accessToken: string }, // Return type
  void, // No arguments needed
  { rejectValue: string } // Error return type
>("auth/refreshAccessToken", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/refresh`, {
      method: "POST",
      credentials: "include", // ✅ Send cookies
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const { accessToken } = await response.json();
    console.log("✅ New access token received:", accessToken);

    localStorage.setItem("accessToken", accessToken); // ✅ Store new access token
    return { accessToken };
  } catch (error) {
    console.error("⛔ Refresh token failed:", error);
    return rejectWithValue("Failed to refresh access token");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem("accessToken"); // ✅ Ensure old token is removed
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    });
  },
});

export const { setUser, clearUser, openLoginModal, closeLoginModal } = authSlice.actions;
export default authSlice.reducer;
