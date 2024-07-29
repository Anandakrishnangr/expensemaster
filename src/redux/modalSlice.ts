import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { Transaction } from '../_pages/transactionGrid';


interface DataModalTransaction {
    id: number | null;
    open: boolean
    data: Transaction | null
}

interface DataModalCategory {
    id: number | null;
    open: boolean
    data: object | null
}
interface ModalProps {
    open: boolean

}

interface ModalState {
    changePassword: ModalProps;
    createTransaction: DataModalTransaction;
    createCategory: DataModalCategory;
}

const initialState: ModalState = {
    changePassword: {
        open: false
    },
    createTransaction: {
        id: null,
        open: false,
        data: null
    },
    createCategory: {
        id: null,
        open: false,
        data: null
    }
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openChangePassword(state, action: PayloadAction<{ open: boolean }>) {
            state.changePassword.open = action.payload.open
        },
        openCreateTransactinModal(state, action: PayloadAction<{ open: boolean, id: null | number, data: Transaction | null }>) {
            state.createTransaction.open = action.payload.open
            state.createTransaction.id = action.payload.id
            state.createTransaction.data = action.payload.data
        },
        openCreateCategory(state, action: PayloadAction<{ open: boolean, id: null | number, data: object | null }>) {
            state.createCategory.open = action.payload.open
            state.createCategory.id = action.payload.id
            state.createCategory.data = action.payload.data

        },

    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState); // Handle the PURGE action to reset state
    },
});

export const { openChangePassword, openCreateTransactinModal, openCreateCategory } = modalSlice.actions;
export default modalSlice.reducer;
