import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index.js";
import authReducer from "./Slicer/Auth.js";
import customerReducer from "./Slicer/Customer.js";
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    customer: customerReducer,
  },
});
