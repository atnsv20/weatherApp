import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ weatherData, ...props }) => {
  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);

    gradient.addColorStop(0, '#A8BBFF');
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(1, 'white');
    return gradient;
  };

  const data = {
    labels: weatherData.map((e) => {
      const date = new Date(e.date);
      return format(date, 'HH:mm');
    }),
    datasets: [
      {
        data: weatherData.map((e) => e.temp),
        label: 'Temperature',
        borderWidth: 4,
        borderColor: '#6183fa',
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx);
        },
        fill: 'start',
        pointRadius: 5,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box maxW='550px' w='100%' mt='auto'>
      <Text fontWeight={100}>12 hours forecast</Text>
      <Box maxW='550px' w='100%' height='200px'>
        <Line data={data} options={options} {...props} />
      </Box>
    </Box>
  );
};

export default LineChart;
