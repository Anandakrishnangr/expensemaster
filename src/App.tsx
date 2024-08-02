import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, Paper } from '@mui/material';
import RouteMap from './RouteMap';
import { SnackBar } from './_components';
import './App.css'
const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <Box sx={{ m: 0 }}>
      <QueryClientProvider client={queryClient}>
        <RouteMap />
        <SnackBar />
      </QueryClientProvider>
    </Box>
  );
}

export default App;
