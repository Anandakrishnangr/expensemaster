import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice'
import modalSlice from './modalSlice';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['modalSlice'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        modal: modalSlice
    },
});



// Correctly type 'persistor'
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
