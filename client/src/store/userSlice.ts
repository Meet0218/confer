import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

const userFromStorage = localStorage.getItem("user");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } catch (e: unknown) {
        console.error("Failed to save user to localStorage:", e);
      }
    },
    logout(state) {
      state.user = null;
      try {
        localStorage.removeItem("user");
      } catch (e: unknown) {
        console.error("Failed to remove user from localStorage:", e);
      }
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
