import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Paper } from '@mui/material';
import RouteMap from './RouteMap';
import {SnackBar} from './_components/index';

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <Paper>
      <QueryClientProvider client={queryClient}>
        <RouteMap />
        <SnackBar />
      </QueryClientProvider>
    </Paper>
  );
}

export default App;
