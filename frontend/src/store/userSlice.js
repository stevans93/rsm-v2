import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },

    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("rsm_user", JSON.stringify(action.payload));
        },

        restoreUser: (state, action) => {
            state.user = action.payload;
        },

        logOutUser: (state, action) => {
            state.user = {};
            localStorage.removeItem("rsm_user");
            localStorage.removeItem("rsm_token");
        },
        storeAllUsers: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { loginUser, restoreUser, logOutUser, storeAllUsers } = userSlice.actions;
export default userSlice.reducer;