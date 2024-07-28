import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import {
    TextField,
    Button,
    Box,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Container,
    CircularProgress
} from '@mui/material';
import { CustomAutocomplete } from '../_components/form/inputs/autoComplete';
import { TextInput } from '../_components';

interface Category {
    id: number;
    Name: string;
    Description: string;
    UserID: string;
    TransactionDate: string;
}

interface TransactionData {
    Description: string;
    Amount: number;
    CategoryID: number;
    TransactionDate: string;
    TransactionType: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get('api/categories/');
    return response.data;
};

const createTransaction = async (transaction: TransactionData): Promise<void> => {
    await axiosInstance.post('api/insert/', transaction);
};

const CreateTransaction: React.FC = () => {
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [categoryID, setCategoryID] = useState<any>(null);
    const [transactionDate, setTransactionDate] = useState<string>('');
    const [transactionType, setTransactionType] = useState<string>('Income');

    const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,

    });
    console.log(categories)
    const mutation = useMutation<void, unknown, TransactionData>({
        mutationFn: createTransaction,
        onSuccess: () => {
            alert('Transaction created successfully!');
        },
        onError: (error: any) => {
            alert(`Failed to create transaction: ${error.response?.data?.message || error.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ Description: description, Amount: amount, CategoryID: categoryID.id, TransactionDate: transactionDate, TransactionType: transactionType });
    };

    // if (isCategoriesLoading) {
    //     return <CircularProgress />;
    // }

    // if (categoriesError) {
    //     return <Typography color="error">Failed to load categories</Typography>;
    // }
    // console.log(categories)

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Create Transaction
                </Typography>
                <TextInput
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextInput
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <CustomAutocomplete
                        onChange={(value) => { setCategoryID(value) }}
                        options={categories}
                        label='sd'
                        descriptionLength={20}
                        value={categoryID}

                    />
                 
                </FormControl>
                <TextField
                    label="Transaction Date"
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Transaction Type</InputLabel>
                    <Select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        required
                    >
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Create Transaction
                </Button>
            </Box>
        </Container>
    );
};

export default CreateTransaction;
