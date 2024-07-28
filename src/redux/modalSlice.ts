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
    createCategory: DataModal;
}

const initialState: ModalState = {
    changePassword: {
        open: false
    },
    createTransaction: {
        id: null,
        open: false
    },
    createCategory: {
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
        openCreateTransactinModal(state, action: PayloadAction<{ open: boolean, id: null | number }>) {
            state.createTransaction.open = action.payload.open
            state.createTransaction.id = action.payload.id
        },
        openCreateCategory(state, action: PayloadAction<{ open: boolean, id: null | number }>) {
            state.createCategory.open = action.payload.open
            state.createCategory.id = action.payload.id
        },

    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState); // Handle the PURGE action to reset state
    },
});

export const { openChangePassword, openCreateTransactinModal, openCreateCategory } = modalSlice.actions;
export default modalSlice.reducer;
