import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { Box, Button, Grid, Card, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardContent } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { openCreateCategory } from '../redux/modalSlice';
import { CategoryData } from './createCategory';

interface Category {
    id: number;
    Name: string;
    Description: string;
    UserID: string;
    TransactionDate: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get('api/categories/');
    return response.data;
};

const deleteCategory = async (id: number): Promise<void> => {
    await axiosInstance.delete(`api/removeCategory/${id}`);
};

const Manage: React.FC = () => {
    const queryClient = useQueryClient();
    const { data: categories, error, isLoading } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const [open, setOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        await deleteCategory(id);
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        setOpen(false);
    };
    let Dispatch = useDispatch()
    const handleOpenDialog = (id: number) => {
        setSelectedCategoryId(id);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleEdit = (id: number, e: CategoryData) => {
        // Implement your edit logic here
        Dispatch(openCreateCategory({ open: true, id, data: e }))
        console.log('Edit category', e);
    };
    const handelCreateCategory = () => {
        // Implement your edit logic here
        Dispatch(openCreateCategory({ open: true, id: null, data: null }))
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading categories</div>;

    return (
        <>
            <Box sx={{ m: 1, height: "100vh", border: '1px solid black' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', padding: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CallMadeIcon color='success' />
                        <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                            Categories
                        </Typography>
                    </Box>
                    <Button onClick={handelCreateCategory} variant='outlined'>
                        <AddIcon /> Create Category
                    </Button>
                </Box>

                <Box sx={{ p: 2 }}>
                    <Grid container sx={{ m: 0, width: '100%' }}>
                        {categories?.map((category) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id} sx={{margin:0,padding:1}}>
                                <Card sx={{p:0}}>
                                    <CardContent sx={{p:0,pb:0,padding:"5px !important"}}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                            <Button onClick={() => handleEdit(category.id, category)}>
                                                <CreateIcon />
                                            </Button>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 ,fontWeight:"900",fontSize:"px"}}>
                                            {category.Name}
                                        </Box>
                                        <Typography>{category.Description}</Typography>
                                        <Button fullWidth onClick={() => handleOpenDialog(category.id)}>
                                            <DeleteIcon /> Delete
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>



            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this category?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            if (selectedCategoryId !== null) {
                                handleDelete(selectedCategoryId);
                            }
                        }}
                        color="primary"
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Manage;
