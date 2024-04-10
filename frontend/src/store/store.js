import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import municipalitySlice from "./municipalitySlice";
import usersSlice from "./usersSlice";

const store = configureStore({
    reducer: {
        userStore: userSlice,
        usersStore: usersSlice,
        municipalityStore: municipalitySlice,
    },
});

export default store;