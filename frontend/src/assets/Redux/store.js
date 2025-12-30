import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../Redux/TaskSlice/TaskSlice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});