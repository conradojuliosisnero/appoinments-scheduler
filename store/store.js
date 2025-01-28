import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "@/slices/dashboardSlice";
import clientSlice from "@/slices/clientSlice";
export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    client: clientSlice,
  },
});
