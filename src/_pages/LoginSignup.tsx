import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Login from './login';
import Register from './register';
import { Container } from '@mui/system';

const LoginSignUp: React.FC = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <Box id="loginPage" className="LoginSign4334" sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
                id="container"
            >
                <Login />
                <Register />
                <Box className="overlay-container">
                    <Box className="overlay">
                        <Box className="overlay-panel overlay-left">
                            <Typography variant="h4" gutterBottom>Welcome Back!</Typography>
                            <Typography variant="body1">To keep connected with us please login with your personal info</Typography>
                            <Button variant="contained" className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</Button>
                        </Box>
                        <Box className="overlay-panel overlay-right">
                            <Typography variant="h4" gutterBottom>Hello, Friend!</Typography>
                            <Typography variant="body1">Enter your personal details and start journey with us</Typography>
                            <Button variant="contained" className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginSignUp;
