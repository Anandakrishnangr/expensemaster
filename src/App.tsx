import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './_pages/register';
import Login from './_pages/login';
import CreateTransaction from './_pages/createTransactions';
import CreateCategory from './_pages/createCategory';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Register</h1>
        <Register />
        <Login/>
        <CreateTransaction/>
        <CreateCategory/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
