import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState = {
  newAppoinmentForm: false,
  userData: {
    name: "",
    email: "",
    gender: "",
  }
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleAppoinmentForm: (state) => {
      state.newAppoinmentForm = !state.newAppoinmentForm;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { toggleAppoinmentForm, setUserData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
