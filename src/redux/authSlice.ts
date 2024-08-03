import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface AuthState {
    username: string | null;
    email: string | null;
    isLoggedIn: boolean;
    token: string | null
}

const initialState: AuthState = {
    username: null,
    email: null,
    isLoggedIn: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string, isLoggedIn: boolean }>) {
            state.isLoggedIn = true;
        },
        loginv2(state, action: PayloadAction<{ username: string }>) {
            state.username = action.payload.username;
        },
        loginWithRegister(state, action: PayloadAction<{ username: string | null; email: string | null, token: string, isLoggedIn: boolean }>) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.token = action.payload.token
        },
        logout(state) {
            state.username = null;
            state.email = null;
            state.isLoggedIn = false;
            state.token = null
        },
        updateEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        updateUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState); // Handle the PURGE action to reset state
    },
});

export const { login, logout,loginv2, updateEmail, updateUsername, loginWithRegister } = authSlice.actions;
export default authSlice.reducer;
