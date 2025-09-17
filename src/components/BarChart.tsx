import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
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

  const labels = [
    '2025-09-10',
    '2025-09-11',
    '2025-09-12',
    '2025-09-13',
    '2025-09-14',
    '2025-09-15',
    '2025-09-16'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '支出',
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '収入',
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />;
    </>
  )
}

export default BarChart