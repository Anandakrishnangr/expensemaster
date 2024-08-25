import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { TextField, Button, Box, Typography, Container, CircularProgress, Modal, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccessSnackbar, showWarningSnackbar } from '../_components/snackbar/Snackbar';
import { openCreateCategory } from '../redux/modalSlice';
import { RootState } from '../redux/store';
import { Close } from '@mui/icons-material';

export interface CategoryData {
  id?: number | null;
  Description: string;
  Name: string;
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
const addCategory = async (category: CategoryData): Promise<void> => {
  await axiosInstance.post('api/insertCategory/', category);
};
const updateCategory = async (category: CategoryData): Promise<void> => {
  await axiosInstance.put('api/updateCategory/', category);
};

const CreateCategory: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  let open = useSelector((state: RootState) => state.modal.createCategory)
  let datas = open
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, CategoryData>({
    mutationFn: open.id == null ? addCategory : updateCategory,
    onSuccess: () => {
      showSuccessSnackbar(`Category ${open.id == null ?"added":"updated"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleClose()
    },
    onError: (error: any) => {
      showWarningSnackbar(`Failed to add category: ${error.response?.data?.message || error.message}`);
    }
  });
  let Dispatch = useDispatch()
  const handleClose = () => Dispatch(openCreateCategory({ open: false, id: null, data: null }))

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    open.id == null ? mutation.mutate({
      Description: description,
      Name: name,
      TransactionDate: currentDate,
    }) : mutation.mutate({
      id: open.id,
      Description: description,
      Name: name,
      TransactionDate: currentDate,
    })
  };
  useEffect(() => {
    if (datas) {
      setDescription(datas.data?.Description ?? '')
      setName(datas.data?.Name ?? '')
      // setCategoryID(datas.CategoryID)
      // setTransactionDate(formatDate(datas.TransactionDate))
      // setTransactionType(datas.TransactionType)
    }
  }, [datas])
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
          <Paper elevation={1} component="form" onSubmit={handleAddCategory} sx={{ mt: 3, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" gutterBottom>
                {open.id == null ? "ADD CATEGORY" : "UPDATE CATEGORY"}
              </Typography>
              <Button onClick={handleClose}><Close sx={{ color: "red", p: 0 }} /></Button>
            </Box>
            <TextField
              size='small'
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              size='small'
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              margin="normal"
            />

            {mutation.status === 'pending' ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                {open.id == null ? "Add Category" : "Update Category"}
              </Button>
            )}
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
};

export default CreateCategory;
