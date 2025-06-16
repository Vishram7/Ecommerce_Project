import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    drivers: [],
    loading: false,
    error: null
}

const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {
        fetchDriversRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDriversSuccess: (state, action) => {
            state.loading = false;
            state.drivers = action.payload;
        },
        fetchDriversFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },

})

export const { fetchDriversRequest, fetchDriversSuccess, fetchDriversFailure } = driverSlice.actions;
export default driverSlice.reducer;