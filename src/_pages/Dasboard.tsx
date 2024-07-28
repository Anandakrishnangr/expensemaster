import React, { useState } from 'react';
import { Paper, Button, Box, ThemeProvider } from '@mui/material';
import LoginSignUp from './LoginSignup';
import CreateTransaction from './createTransactions';
import CreateCategory from './createCategory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkTheme, lightTheme } from '../_styles/CreateTheme';
import LabTabs from '../_components/navbar/navbar';
import TransactionDataGrid from './transactionGrid';
import { Route, Routes } from 'react-router-dom';
import Manage from './manage';

const DashboardHome: React.FC = () => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Paper>

                <Box className="App">
                    <LabTabs theme={toggleTheme} />
                    <Routes>
                        <Route path='/manage' element={<Manage />} />
                        <Route path='/transactions' element={<TransactionDataGrid />} />
                    </Routes>
                    <CreateTransaction />
                    <CreateCategory />
                </Box>

                <TransactionDataGrid />
            </Paper>
        </ThemeProvider>
    );
};

export default DashboardHome;
