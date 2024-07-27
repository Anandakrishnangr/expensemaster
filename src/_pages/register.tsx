import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { loginWithRegister } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { showSuccessSnackbar, showWarningSnackbar } from '../_components/snackbar/Snackbar';


interface User {
    email: string;
    username: string;
}
interface RegisterResponse {
  token: string;
  user:User
}

interface RegisterData {
  email: string;
  password: string;
  username: string
}

const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>('/api/register/', userData);
  return response.data;
};

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<string>('');

  let dispatch = useDispatch()
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const mutation = useMutation<RegisterResponse, unknown, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store the returned token in local storage
      debugger
      dispatch(loginWithRegister({
        username: data.user.username,
        email: data.user.email,
        isLoggedIn: true,
        token: data.token
    }))
      localStorage.setItem('token', data.token);
      showSuccessSnackbar('Registration successful!');
    },
    onError: (error: any) => {
      showWarningSnackbar(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  });
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    mutation.mutate({ email, password, username: user });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                size='small'
                fullWidth
                variant="outlined"
                label="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
