import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './_pages/register';
import Login from './_pages/login';
import CreateTransaction from './_pages/createTransactions';
import CreateCategory from './_pages/createCategory';
import { Box, Button, Paper, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './_styles/CreateTheme';
import LoginSignUp from './_pages/LoginSignup';
import RouteMap from './RouteMap';

const queryClient = new QueryClient();

const App: React.FC = () => {


  return (
    <Paper>
      <QueryClientProvider client={queryClient}>
        <RouteMap />
      </QueryClientProvider>
    </Paper>
  );
}

export default App;
