import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newAppoinmentForm: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleAppoinmentForm: (state) => {
      state.newAppoinmentForm = !state.newAppoinmentForm;
    },
  },
});

export const { toggleAppoinmentForm } = dashboardSlice.actions;

export default dashboardSlice.reducer;
