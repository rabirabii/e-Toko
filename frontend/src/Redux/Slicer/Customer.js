import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
    error: null,
  },
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload.customer;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setCustomer, setError } = customerSlice.actions;
export default customerSlice.reducer;
