import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },

    reducers: {
        storeAllUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

export const { storeAllUsers } = usersSlice.actions;
export default usersSlice.reducer;