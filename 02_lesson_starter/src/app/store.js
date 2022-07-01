import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice.js";
import userReducer from '../features/users/usersSlice.js'
export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer, 
    }
})
