import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LiveLineGraph = () => {
  // Initial state for the chart data
  const [chartData, setChartData] = useState({
    labels: Array.from({length: 500}, (_, i) => i + 1), // Generate labels from 1 to 500
    datasets: [
      {
        label: 'Reward',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Goals Scored',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  // Function to add data to the graph
  const addData = (episode, reward, goalScored) => {
    setChartData((prevData) => {
      const dataCopy = { ...prevData };
      if (dataCopy.datasets[0].data.length < 500) { // Ensure we're not adding beyond 500 episodes
        dataCopy.datasets[0].data[episode - 1] = reward;
        dataCopy.datasets[1].data[episode - 1] = goalScored;
      }
      return dataCopy;
    });
  };

  // Simulate adding data every 2 seconds for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      const episode = chartData.datasets[0].data.length + 1;
      const reward = Math.floor(Math.random() * 100);
      const goalScored = Math.floor(Math.random() * 100);
      if (episode <= 500) {
        addData(episode, reward, goalScored);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [chartData]);

  return <Line data={chartData} />;
};

export default LiveLineGraph;
