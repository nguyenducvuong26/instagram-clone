import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postReducer from "./posts";

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
    },
});

export default store;
