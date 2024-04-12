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
  const reward = useSelector(state => state.reward);
  const [cumulativeReward, setCumulativeReward] = useState(0);
  const [episode, setEpisode] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Reward per Episode',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Reward',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {

    setEpisode((prevEpisode) => prevEpisode + 1);
   
    setCumulativeReward((prevTotal) => prevTotal + reward);

    
    setChartData((prevData) => ({
      ...prevData,
      labels: [...prevData.labels, `Episode ${episode + 1}`], 
      datasets: prevData.datasets.map((dataset) => {
        if (dataset.label === 'Reward per Episode') {

          return { ...dataset, data: [...dataset.data, reward] };
        } else if (dataset.label === 'Total Reward') {
          return { ...dataset, data: [...dataset.data, cumulativeReward + reward] };
        }
        return dataset;
      }),
    }));
  }, [reward]);

  return <Line data={chartData} />;
};

export default LiveLineGraph;
