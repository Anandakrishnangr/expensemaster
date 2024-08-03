import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    CircularProgress,
    Modal,
    Paper
} from '@mui/material';
import { CustomAutocomplete } from '../_components/form/inputs/autoComplete';
import { TextInput } from '../_components';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { openCreateTransactinModal } from '../redux/modalSlice';
import { showErrorSnackbar, showSuccessSnackbar } from '../_components/snackbar/Snackbar';
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'path';
interface Category {
    id: number;
    Name: string;
    Description: string;
    UserID: string;
    TransactionDate: string;
}
interface TransactionData {
    id?: number | null
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


const CreateTransaction: React.FC = () => {
    let open = useSelector((state: RootState) => state.modal.createTransaction)
    let datas = open.data
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [categoryID, setCategoryID] = useState<any>(null);
    const [transactionDate, setTransactionDate] = useState<string>(moment(new Date()).toISOString().split('T')[0]);
    console.log(transactionDate)
    const [transactionType, setTransactionType] = useState<string>('Income');
    let Dispatch = useDispatch()
    const queryClient = useQueryClient();

    const handleClose = () => {
        Dispatch(openCreateTransactinModal({ open: false, id: null, data: null }))
        setDescription('')
        setAmount(0)
        setCategoryID(null)
        setTransactionDate('')
    }

    const createTransaction = async (transaction: TransactionData): Promise<void> => {
        delete transaction.id
        await axiosInstance.post('api/insert/', transaction)
    };
    const updateTransaction = async (transaction: TransactionData): Promise<void> => {
        await axiosInstance.put('/api/update/', transaction)
    };
    const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,

    });
    const mutation = useMutation<void, unknown, TransactionData>({
        mutationFn: open.id == null ? createTransaction : updateTransaction,
        onSuccess: () => {
            showSuccessSnackbar(open.id == null ? 'Transaction created successfully !' : "Transaction updated successfully !");
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            handleClose()
        },
        onError: (error: any) => {
            showErrorSnackbar(`Failed to create transaction: ${error.response?.data?.message || error.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ Description: description, Amount: amount, CategoryID: categoryID?.id ?? categoryID, TransactionDate: transactionDate, TransactionType: transactionType, id: open?.id });
    };
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-based month, so add 1
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        if (datas) {
            setDescription(datas.Description)
            setAmount(datas.Amount)
            setCategoryID(datas.CategoryID)
            setTransactionDate(formatDate(datas.TransactionDate))
            setTransactionType(datas.TransactionType)
        }
    }, [datas])

    // if (isCategoriesLoading) {
    //     return <CircularProgress />;
    // }

    // if (categoriesError) {
    //     return <Typography color="error">Failed to load categories</Typography>;
    // }
    // console.log(categories)

    return (
        <Modal open={open.open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Container maxWidth="sm">
                    <Paper elevation={1} component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h5" gutterBottom>
                                {open.id == null ? "Create Transaction" : "Update Transaction"}
                            </Typography>
                            <Button onClick={handleClose}><Close sx={{ color: "red", p: 0 }} /></Button>
                        </Box>
                        <TextInput
                            size='small'
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextInput
                            size='small'
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />

                        <FormControl fullWidth margin="normal">
                            <CustomAutocomplete
                                onChange={(value) => { setCategoryID(value) }}
                                options={categories}
                                label='Category'
                                descriptionLength={20}
                                value={categoryID}

                            />

                        </FormControl>
                        <TextField
                            size='small'
                            label="Transaction Date"
                            type="date"
                            value={transactionDate}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setTransactionDate(e.target.value)
                            }}
                            required
                            fullWidth
                            margin="normal"
                            placeholder="dd/mm/yyyy"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Transaction Type</InputLabel>
                            <Select
                                label="Transaction Type"
                                size='small'
                                value={transactionType}
                                onChange={(e) => setTransactionType(e.target.value)}
                                required
                            >
                                <MenuItem value="Income">Income</MenuItem>
                                <MenuItem value="Expense">Expense</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {open.id == null ? "Create Transaction" : "Update Transaction"}
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </Modal>
    );
};

export default CreateTransaction;
