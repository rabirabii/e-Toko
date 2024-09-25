import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarCollapsed = action.payload;
    },
    toggleTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleSidebar, toggleTheme } = globalSlice.actions;
export default globalSlice.reducer;
