import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

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
  const rewards = useSelector(state => state.reward);
  const [episode, setEpisode] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Blue Player Reward per Episode',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Red Player Reward per Episode',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Reward',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  useEffect(() => {
    setEpisode(prevEpisode => prevEpisode + 1);

    setChartData(prevData => {
      const newLabels = [...prevData.labels, `Episode ${episode + 1}`];
      const newDatasets = prevData.datasets.map(dataset => {
        if (dataset.label === 'Blue Player Reward per Episode') {
          return { ...dataset, data: [...dataset.data, rewards.blue] };
        } else if (dataset.label === 'Red Player Reward per Episode') {
          return { ...dataset, data: [...dataset.data, rewards.red] };
        } else if (dataset.label === 'Total Reward') {
          return { ...dataset, data: [...dataset.data, rewards.blue + rewards.red] };
        }
        return dataset;
      });

      return { labels: newLabels, datasets: newDatasets };
    });
  }, [rewards]);

  return <Line data={chartData} />;
};

export default LiveLineGraph;
