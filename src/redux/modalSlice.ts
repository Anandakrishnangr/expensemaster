import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';


interface DataModal {
    id: number | null;
    open: boolean
}

interface ModalProps {
    open: boolean

}

interface ModalState {
    changePassword: ModalProps;
    createTransaction: DataModal;
}

const initialState: ModalState = {
    changePassword: {
        open: false
    },
    createTransaction: {
        id: null,
        open: false
    }
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openChangePassword(state, action: PayloadAction<{ open: boolean }>) {
            state.changePassword.open = action.payload.open
        },
        

    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState); // Handle the PURGE action to reset state
    },
});

export const { openChangePassword, } = modalSlice.actions;
export default modalSlice.reducer;
