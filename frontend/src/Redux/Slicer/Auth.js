import { createSlice } from "@reduxjs/toolkit";
import { logoutCustomer } from "../Reducer/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Ketika logout berhasil
      .addCase(logoutCustomer.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
      })
      // Ketika logout gagal
      .addCase(logoutCustomer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setToken, clearToken, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
