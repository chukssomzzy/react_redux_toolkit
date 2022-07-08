import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice.js";
import userReducer from '../features/users/usersSlice.js'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: userReducer, 
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware) ,
    devTools: true
})
