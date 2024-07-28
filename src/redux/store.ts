import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import dataReducer from './dataSlice';
import modalReducer from './modalSlice';

// Configuration for the persisted reducers
const persistConfig = {
    key: 'root', // The key for the persisted state
    storage,
    whitelist: ['auth', 'data'], // Only the 'auth' and 'data' slices will be persisted
};

// Create a persisted reducer for the auth and data slices
const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    modal: modalReducer, // Modal slice is not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

// Correctly type 'persistor'
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
