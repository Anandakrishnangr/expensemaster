import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Box, Button, Container, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { loginWithRegister } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { showSuccessSnackbar, showWarningSnackbar } from '../_components/snackbar/Snackbar';
import axiosInstance from '../_utils/axios';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';


interface User {
  email: string;
  username: string;
}
interface RegisterResponse {
  token: string;
  user: User
}

interface RegisterData {
  email: string;
  password: string;
  username: string
}

const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>('api/register/', userData);
  return response.data;
};

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const [user, setUser] = useState<string>('');
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const mutation = useMutation<RegisterResponse, unknown, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store the returned token in local storage
      dispatch(loginWithRegister({
        username: data.user.username,
        email: data.user.email,
        isLoggedIn: true,
        token: data.token
      }))
      localStorage.setItem('token', data.token);
      showSuccessSnackbar('Registration successful!');
      navigate('/')
    },
    onError: (error: any) => {

      const errorResponse = error.response as { data: { [key: string]: string[] } };

      if (errorResponse) {
        const firstErrorKey = Object.keys(errorResponse.data)[0];
        const errorMessage = errorResponse.data[firstErrorKey]?.[0] || 'Error changing password. Please try again.';
        showWarningSnackbar(`Error: ${errorMessage}`);
      } else {
        showWarningSnackbar('Error changing password. Please try again.');
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.length) {
      return showWarningSnackbar("Enter a username")
    }
    if (!email.length) {
      return showWarningSnackbar("Enter email !")
    }
    if (!regex.test(email)) {
      return showWarningSnackbar("Enter a valid email")
    }
    if (!password.length) {
      return showWarningSnackbar("Enter a password !")
    }
    if (password.length < 8) {
      return showWarningSnackbar("Password must have 8 characters long !")
    }
    if (password !== confirmPassword) {
      showWarningSnackbar('Passwords do not match');
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
        <Box >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{
                  '& .MuiFormLabel-asterisk': {
                    color: 'red',
                  },
                }}
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
                sx={{
                  '& .MuiFormLabel-asterisk': {
                    color: 'red',
                  },
                }}
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
                sx={{
                  '& .MuiFormLabel-asterisk': {
                    color: 'red',
                  },
                }}
                size='small'
                fullWidth
                variant="outlined"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment sx={{cursor:"pointer"}} position="end">
                              {showPassword ? <Visibility
                                  onMouseDown={() => {
                                      setShowPassword(false)
                                  }}
                                  onClick={() => {
                                      setShowPassword(!showPassword)
                                  }} /> : <VisibilityOff
                                  onMouseDown={() => {
                                      setShowPassword(false)
                                  }}
                                  onClick={() => {
                                      setShowPassword(!showPassword)
                                  }} />}
                      </InputAdornment>
                  )
              }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  '& .MuiFormLabel-asterisk': {
                    color: 'red',
                  },
                }}
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
              <Button type="button" onClick={handleSubmit} fullWidth variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
