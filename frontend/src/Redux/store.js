import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index.js";
export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
