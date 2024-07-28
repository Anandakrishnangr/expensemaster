import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import axiosInstance from '../_utils/axios';

// Define the type for a category
interface Category {
    id: number;
    Name: string;
    Description: string;
    UserID: string;
    TransactionDate: string;
}

// Define the type for a transaction
interface TransactionData {
    id: number;
    Amount: number;
    CategoryID: number;
    Description: string;
    TransactionDate: string;
    TransactionType: string;
    UserID: number;
}

// Define the initial state for categories and transactions
interface AppState {
    categories: {
        Loaded: boolean;
        data: Category[];
    };
    transactions: {
        Loaded: boolean;
        data: TransactionData[];
    };
}

const INITIAL_STATE: AppState = {
    categories: {
        Loaded: false,
        data: []
    },
    transactions: {
        Loaded: false,
        data: []
    }
};



// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async () => {
        const response = await axiosInstance.get('/api/categories');
        return response.data; // Assuming response.data is an array of Category
    }
);

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk<TransactionData[]>(
    'transactions/fetchTransactions',
    async () => {
        const response = await axiosInstance.get('/api/transactions');
        return response.data; // Assuming response.data is an array of TransactionData
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        // Handle category-related actions
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.categories.Loaded = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories.data = action.payload;
                state.categories.Loaded = true;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.categories.Loaded = false;
            })

            // Handle transaction-related actions
            .addCase(fetchTransactions.pending, (state) => {
                state.transactions.Loaded = false;
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<TransactionData[]>) => {
                state.transactions.data = action.payload;
                state.transactions.Loaded = true;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.transactions.Loaded = false;
            })

            // Handle PURGE action
            .addCase(PURGE, () => INITIAL_STATE);
    }
});

export default appSlice.reducer;
