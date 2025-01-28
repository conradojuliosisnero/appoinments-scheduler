import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateClientForm: false,
    deleteClientForm: false,
};



const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        toggleUpdateClientForm: (state) => {
            state.updateClientForm = !state.updateClientForm;
        },
        toggleDeleteClientForm: (state) => {
            state.deleteClientForm = !state.deleteClient
        },
    }
});

export const { toggleDeleteClientForm,toggleUpdateClientForm } =
  clientsSlice.actions;

export default clientsSlice.reducer;
