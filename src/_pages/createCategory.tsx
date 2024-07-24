import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { TextField, Button, Box, Typography, Container, CircularProgress } from '@mui/material';

interface CategoryData {
  Description: string;
  Name: string;
  TransactionDate: string;
}

const addCategory = async (category: CategoryData): Promise<void> => {
  await axiosInstance.post('api/insertCategory/', category);
};

const CreateCategory: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');

  const mutation = useMutation<void, unknown, CategoryData>({
    mutationFn: addCategory,
    onSuccess: () => {
      alert('Category added successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to add category: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    mutation.mutate({
      Description: description,
      Name: name,
      TransactionDate: currentDate,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleAddCategory} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add Category
        </Typography>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        {mutation.status === 'pending' ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Category
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default CreateCategory;
