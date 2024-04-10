import { createSlice } from "@reduxjs/toolkit";

const municipalitySlice = createSlice({
    name: "municipalities",
    initialState: {
        totalPages: 0,
        municipalities: [],
    },

    reducers: {
        storeAllMunicipalities: (state, action) => { 
            state.totalPages = action.payload.totalPages;
            state.municipalities = action.payload.municipalities;
        }
    }
});

export const { storeAllMunicipalities } = municipalitySlice.actions;
export default municipalitySlice.reducer;