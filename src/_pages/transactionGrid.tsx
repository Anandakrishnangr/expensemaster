import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { openCreateTransactinModal } from '../redux/modalSlice';
import ReceiptIcon from '@mui/icons-material/Receipt';
export interface Transaction {
    id: number;
    Amount: number;
    CategoryID: {
        id: number;
        Name: string;
        Description: string;
        TransactionDate: string;
        UserID: number;
    };
    Description: string;
    TransactionDate: string;
    TransactionType: string;
    UserID: number;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
    const response = await axiosInstance.get('api/transactions/');
    // Transform the data to include CategoryName
    const transactions = response.data.map((transaction: Transaction) => ({
        ...transaction,
        CategoryName: transaction.CategoryID.Name
    }));
    return transactions;
};

const deleteTransaction = async (id: number): Promise<void> => {
    await axiosInstance.delete(`api/remove/${id}`);
};

const TransactionDataGrid: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const { data: transactions = [], isLoading, error } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    });

    const deleteMutation = useMutation<void, unknown, number>({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            deleteMutation.mutate(deleteId);
            setDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteId(null);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-based month, so add 1
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Amount', headerName: 'Amount', width: 130 },
        { field: 'CategoryName', headerName: 'Category Name', width: 130 }, // Updated field
        { field: 'Description', headerName: 'Description', width: 200 },
        {
            field: 'TransactionDate', headerName: 'Transaction Date', width: 180,
            renderCell: (params) => {
                return <span>{formatDate(params.value)}</span>;
            },
        },
        { field: 'TransactionType', headerName: 'Transaction Type', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: any) => (
                <Button variant="contained" color="secondary" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(params.row.id);
                }}>
                    Delete
                </Button>
            ),
        },
    ];

    const filteredTransactions = transactions.filter((transaction: Transaction) =>
        transaction.Description.toLowerCase().includes(searchText.toLowerCase())
    );

    let Dispatch = useDispatch();
    const handleCreateTransaction = () => {
        Dispatch(openCreateTransactinModal({ open: true, id: null, data: null }));
    };

    return (
        <Container sx={{
            background: "transparent", boxShadow: `
    inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
        }} maxWidth="lg">
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px", p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ReceiptIcon color='success' sx={{ marginRight: '10px' }} /> All Transactions
                    </Box>
                    <Button sx={{ whiteSpace: "nowrap", pl: 3, pr: 3, fontSize: "12px" }} variant='contained' onClick={handleCreateTransaction}>Create Transaction</Button>
                    {/* <TextField
                        size='small'
                        label="Search"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchText}
                        onChange={handleSearch}
                    /> */}
                </Box>
                {isLoading ? (
                    <CircularProgress />
                ) : error ? (
                    <div>Error loading transactions</div>
                ) : (
                    <Box sx={{
                        height: 600, width: '100%'
                    }}>
                        <DataGrid
                            rows={filteredTransactions}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            onRowClick={(e) => {
                                let id = e.id ? Number(e.id) : null;
                                Dispatch(openCreateTransactinModal({ open: true, id, data: e.row }));
                            }}
                            pageSizeOptions={[10, 20, 50]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                )}
                <Dialog
                    open={deleteId !== null}
                    onClose={handleCancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this transaction?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                            No
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};
const CustomToolbar: React.FC = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

export default TransactionDataGrid;
