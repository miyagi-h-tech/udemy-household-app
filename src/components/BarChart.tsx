import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '../types';
import { calculateDailyBlances } from '../utils/financeCalculations';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

function BarChart({ monthlyTransactions, isLoading }: BarChartProps) {
  const theme = useTheme();
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };


  const dailyBlances = calculateDailyBlances(monthlyTransactions);

  const dateLabels = Object.keys(dailyBlances).sort();
  const expenseData = dateLabels.map((day) => dailyBlances[day].expense);
  const incomeData = dateLabels.map((day) => dailyBlances[day].income);

  const labels = [
    '2025-09-10',
    '2025-09-11',
    '2025-09-12',
    '2025-09-13',
    '2025-09-14',
    '2025-09-15',
    '2025-09-16'
  ];

  const data: ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: '支出',
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
      {
        label: '収入',
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };

  return (
    <Box sx={{
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      }}>
      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}
    </Box>
  )
}

export default BarChart