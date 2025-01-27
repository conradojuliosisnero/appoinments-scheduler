import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newAppoinmentForm: false,
  userData: {
    name: "",
    email: "",
    gender: "",
  },
  filters: "all",
  filtersFind: [],
};

const serializeEvent = (event) => ({
  ...event,
  start: event.start.toISOString(),
  end: event.end.toISOString(),
});

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
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setFiltersFind: (state, action) => {
      const serializedEvents = action.payload?.map(serializeEvent);
      state.filtersFind = serializedEvents;
    },
  },
});

export const { toggleAppoinmentForm, setUserData, setFilters, setFiltersFind } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
