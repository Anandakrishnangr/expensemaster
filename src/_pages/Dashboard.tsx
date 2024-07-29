import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { Box, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/models';
// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface Transaction {
  Amount: number;
  CategoryID: number;
  Description: string;
  TransactionDate: string;
  TransactionType: string;
  UserID: number;
  id: number;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await axiosInstance.get('api/transactions/');
  return response.data;
};

const DashBoard: React.FC = () => {
  const { data: transactions, error: transactionsError, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const [data, setData] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Income',
        data: [] as number[],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        fill: false
      },
      {
        label: 'Expense',
        data: [] as number[],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill: false
      }
    ]
  });

  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    dayjs().startOf('month'),
    dayjs().endOf('month')
  ]);

  const [chartType, setChartType] = useState<string>('line');

  const chartOptions = [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' }
  ];

  useEffect(() => {
    if (transactions) {
      const filteredTransactions = filterTransactions(transactions);
      
      let totalIncome = 0;
      let totalExpense = 0;

      const incomeData: { [key: string]: number } = {};
      const expenseData: { [key: string]: number } = {};

      filteredTransactions.forEach(transaction => {
        const date = transaction.TransactionDate.split('T')[0];

        if (transaction.TransactionType === 'Income') {
          totalIncome += transaction.Amount;
          incomeData[date] = (incomeData[date] || 0) + transaction.Amount;
        } else if (transaction.TransactionType === 'Expense') {
          totalExpense += transaction.Amount;
          expenseData[date] = (expenseData[date] || 0) + transaction.Amount;
        }
      });

      setData({
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense
      });

      const labels = Object.keys({ ...incomeData, ...expenseData }).sort();

      const incomeDataset = labels.map(label => incomeData[label] || 0);
      const expenseDataset = labels.map(label => expenseData[label] || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeDataset,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: false
          },
          {
            label: 'Expense',
            data: expenseDataset,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: false
          }
        ]
      });
    }
  }, [transactions, dateRange]);

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value);
  };

  const filterTransactions = (transactions: Transaction[]) => {
    if (!dateRange[0] && !dateRange[1]) {
      return transactions;
    }
    return transactions.filter(transaction => {
      const transactionDate = dayjs(transaction.TransactionDate);
      if (dateRange[0] && dateRange[1]) {
        return transactionDate.isSame(dateRange[0]) || transactionDate.isSame(dateRange[1]) || (transactionDate.isAfter(dateRange[0]) && transactionDate.isBefore(dateRange[1]));
      } else if (dateRange[0]) {
        return transactionDate.isSame(dateRange[0]) || transactionDate.isAfter(dateRange[0]);
      } else if (dateRange[1]) {
        return transactionDate.isSame(dateRange[1]) || transactionDate.isBefore(dateRange[1]);
      }
      return true;
    });
  };

  if (isLoadingTransactions) return <div>Loading...</div>;
  if (transactionsError) return <div>Error loading data</div>;

  return (
    <>
      <Box sx={{ m: 1, border: '1px solid black', padding: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Account Summary</Typography>
        <Typography>Income: {data.income}</Typography>
        <Typography>Expense: {data.expense}</Typography>
        <Typography>Balance: {data.balance}</Typography>
      </Box>

      <Box sx={{ m: 1, border: '1px solid black', padding: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Filters</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
          />
        </LocalizationProvider>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="chart-type-label">Chart Type</InputLabel>
          <Select
            labelId="chart-type-label"
            id="chart-type-select"
            value={chartType}
            label="Chart Type"
            onChange={handleChartTypeChange}
          >
            {chartOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ m: 1, border: '1px solid black' }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Income and Expense Over Time</Typography>
        {chartType === 'line' && <Line data={chartData} />}
        {chartType === 'bar' && <Bar data={chartData} />}
      </Box>
    </>
  );
};

export default DashBoard;
