import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Create the store
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Export the store
export default store;

// Export RootState and AppDispatch types for usage in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
