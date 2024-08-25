import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { TextField, Button, Box, Typography, Container, Paper, InputAdornment, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { showSuccessSnackbar, showWarningSnackbar } from '../_components/snackbar/Snackbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface User {
    email: string;
    username: string;
}
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
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    let dispatch = useDispatch()

    const mutation = useMutation<LoginResponse, unknown, LoginData>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Store the returned token in local storage
            dispatch(login({
                isLoggedIn: true,
                token: data.token
            }))
            localStorage.setItem('token', data.token);
            showSuccessSnackbar("Logged in!")
            // alert('Login successful!');
        },
        onError: (error: any) => {
            console.log(error)
            showWarningSnackbar(`Login failed: ${error.response?.data?.message || error.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.length) {
            return showWarningSnackbar("Enter username !")
        }
        if (!password.length) {
            return showWarningSnackbar("Enter password")
        }
        console.log('sdfsdf')
        mutation.mutate({ username, password });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    size='small'
                    label="Username"
                    type="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                    fullWidth
                    sx={{
                        '& .MuiFormLabel-asterisk': {
                            color: 'red',
                        },
                    }}
                />
                <TextField
                    size='small'
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiFormLabel-asterisk': {
                            color: 'red',
                        },
                    }}
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
                <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
