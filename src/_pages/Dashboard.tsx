import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { Box, Typography, MenuItem, FormControl, Select, InputLabel, TextField, Card, CardContent, Grid } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';
// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface Category {
  id: number;
  Name: string;
  Description: string;
  UserID: string;
  TransactionDate: string;
}

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

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get('api/categories/');
  return response.data;
};

const DashBoard: React.FC = () => {
  const { data: transactions, error: transactionsError, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const { data: categories, error: categoriesError, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
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

  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [chartType, setChartType] = useState<string>('line');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const chartOptions = [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' }
  ];

  useEffect(() => {
    if (transactions) {
      let filteredTransactions = filterTransactions(transactions);
      if (selectedCategory !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.CategoryID === parseInt(selectedCategory));
      }

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
  }, [transactions, dateRange, selectedCategory]);

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const filterTransactions = (transactions: Transaction[]) => {
    if (!dateRange[0] && !dateRange[1]) {
      return transactions;
    }
    return transactions.filter(transaction => {
      const transactionDate = dayjs(transaction.TransactionDate);
      if (dateRange[0] && dateRange[1]) {
        return transactionDate.isAfter(dateRange[0]) && transactionDate.isBefore(dateRange[1]);
      } else if (dateRange[0]) {
        return transactionDate.isAfter(dateRange[0]);
      } else if (dateRange[1]) {
        return transactionDate.isBefore(dateRange[1]);
      }
      return true;
    });
  };

  if (isLoadingTransactions || isLoadingCategories) return <div>Loading...</div>;
  if (transactionsError || categoriesError) return <div>Error loading data</div>;

  return (
    <>
      <Card sx={{
        background: "transparent", boxShadow: `
    inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
      }}>
        <CardContent sx={{ m: 1, boxShadow: "none" }}>
          <Box sx={{ m: 1, padding: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>Account Summary</Typography>
            <Box>
              <Box >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent className='seperation'>
                        <Box display="flex" alignItems="center">
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PaidIcon sx={{ fontSize: '45px' }} color="success" />
                          </Box>
                          <Box ml={1}>
                            <Typography variant="body1" sx={{ fontSize: '10px' }} >
                              Income
                            </Typography>
                            <Typography sx={{ fontSize: "20px" }}>
                              ₹ {data.income}
                            </Typography>
                          </Box>
                        </Box>

                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent className='seperation'>
                        <Box display="flex" alignItems="center">
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PaidIcon sx={{ fontSize: '45px' }} color="error" />
                          </Box>
                          <Box ml={1}>
                            <Typography variant="body1" sx={{ fontSize: '10px' }} >
                              Expense
                            </Typography>
                            <Typography >
                              ₹ {data.expense}
                            </Typography>
                          </Box>
                        </Box>

                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent className='seperation'>
                        <Box display="flex" alignItems="center">
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <AccountBalanceIcon sx={{ fontSize: '45px' }} />
                          </Box>
                          <Box ml={1}>
                            <Typography variant="body1" sx={{ fontSize: '10px' }} >
                              Balance
                            </Typography>
                            <Typography sx={{ fontSize: "20px", color: data.balance >= 0 ? 'red' : 'green' }}>
                              ₹ {data.balance}
                            </Typography>
                          </Box>
                        </Box>

                      </CardContent>
                    </Card>
                  </Grid>


                </Grid>
              </Box>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ textAlign: 'center' }}>Income and Expense Over Time</Typography>
          <Card>
            <CardContent sx={{ m: 1, padding: 2 }}>
              <Box sx={{ display: "flex" }}>
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {Array.isArray(categories) ? categories.map(category => (
                      <MenuItem key={category.id} value={category.id.toString()}>
                        {category.Name}
                      </MenuItem>
                    )) : ""}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {chartType === 'line' && <Line data={chartData} />}
          {chartType === 'bar' && <Bar data={chartData} />}
        </CardContent>
      </Card>
    </>
  );
};

export default DashBoard;
