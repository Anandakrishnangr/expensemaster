import React, { useState } from 'react';
import { Paper, Box, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../_styles/CreateTheme';
import LabTabs from '../_components/navbar/navbar';
import TransactionDataGrid from './transactionGrid';
import { Route, Routes } from 'react-router-dom';
import Manage from './manage';
import Dashboard from './Dashboard';
import { ChangePasswordModal } from '../_components';

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
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/manage' element={<Manage />} />
                        <Route path='/transactions' element={<TransactionDataGrid />} />
                    </Routes>
                </Box>
                <ChangePasswordModal />
            </Paper>
        </ThemeProvider>
    );
};

export default DashboardHome;
