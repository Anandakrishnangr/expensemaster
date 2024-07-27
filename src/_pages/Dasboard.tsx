import React, { useState } from 'react';
import { Paper, Button, Box, ThemeProvider } from '@mui/material';
import LoginSignUp from './LoginSignup';
import CreateTransaction from './createTransactions';
import CreateCategory from './createCategory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkTheme, lightTheme } from '../_styles/CreateTheme';
import LabTabs from '../_components/navbar/navbar';

const DashboardHome: React.FC = () => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Paper>
                <Button variant="contained" onClick={toggleTheme} sx={{ mb: 2 }}>
                    Toggle Theme
                </Button>
                <Box className="App">
                    <LabTabs/>
                    <CreateTransaction />
                    <CreateCategory />
                </Box>
            </Paper>
        </ThemeProvider>
    );
};

export default DashboardHome;
