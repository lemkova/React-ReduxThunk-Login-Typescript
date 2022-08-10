import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './reducers/usersSlice'
import authReducer from "./reducers/authSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch