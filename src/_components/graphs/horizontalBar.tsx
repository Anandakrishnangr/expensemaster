import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Transaction } from '../../_pages/transactionGrid';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  transactions: Transaction[];
  TransactionType: string;
}

const HorizontalBarChart: React.FC<Props> = ({ transactions, TransactionType }) => {
  // Filter out income transactions
  const incomeTransactions = transactions.filter(tx => tx.TransactionType === TransactionType);

  // Calculate total income
  const totalIncome = incomeTransactions.reduce((sum, tx) => sum + tx.Amount, 0);

  // Create a map to keep track of category contributions
  const categoryMap = new Map<number, { name: string, amount: number }>();

  // Populate the map with transaction data
  incomeTransactions.forEach(tx => {
    const categoryId = tx.CategoryID.id;
    const categoryName = tx.CategoryID.Name;
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, { name: categoryName, amount: 0 });
    }
    const categoryData = categoryMap.get(categoryId);
    if (categoryData) {
      categoryData.amount += tx.Amount;
    }
  });

  // Get all unique categories from the transactions data
  const allCategories = Array.from(new Set(transactions.map(tx => tx.CategoryID.id))).map(id => ({
    id,
    name: transactions.find(tx => tx.CategoryID.id === id)?.CategoryID.Name || 'Unknown',
  }));

  // Include all categories, even those with zero contribution
  allCategories.forEach(category => {
    if (!categoryMap.has(category.id)) {
      categoryMap.set(category.id, { name: category.name, amount: 0 });
    }
  });

  const labels = Array.from(categoryMap.values()).map(contribution => contribution.name);
  const data = Array.from(categoryMap.values()).map(contribution => (totalIncome > 0 ? (contribution.amount / totalIncome) * 100 : 0));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Percentage Contribution',
        data,
        backgroundColor: TransactionType === 'Income' ? 'green' : 'red', // Set the bar color based on the transaction type
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Category Contribution to Total ${TransactionType}`,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        barThickness: 10,
        maxBarThickness: 10,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default HorizontalBarChart;
