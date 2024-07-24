import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios'; 
import { TextField, Button, Box, Typography } from '@mui/material';

interface LoginResponse {
  token: string;
}

interface LoginData {
  username: string;
  password: string;
}

const loginUser = async (userData: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/api/login/', userData);
  return response.data;
};

const Login: React.FC = () => {
  const [username, setusername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const mutation = useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store the returned token in local storage
      localStorage.setItem('token', data.token);
      alert('Login successful!');
    },
    onError: (error: any) => {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="username"
        type="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
