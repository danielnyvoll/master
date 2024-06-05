import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import "./GraphStyle.css"; // Make sure this path is correct

import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

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
  const episodeRef = useRef(0);  // Using useRef to track the episode count

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
    ],
  });

  useEffect(() => {
    // Increment the episode count only when rewards update
    episodeRef.current += 1;

    setChartData(prevData => {
      const newLabels = [...prevData.labels, `Episode ${episodeRef.current}`];
      const newDatasets = prevData.datasets.map(dataset => {
        if (dataset.label === 'Blue Player Reward per Episode') {
          return { ...dataset, data: [...dataset.data, rewards.blue] };
        } else if (dataset.label === 'Red Player Reward per Episode') {
          return { ...dataset, data: [...dataset.data, rewards.red] };
        }
        return dataset;
      });

      return { labels: newLabels, datasets: newDatasets };
    });
  }, [rewards]);  // Only trigger the effect when `rewards` changes

  return <div className="graph-container"><Line data={chartData} /></div>;
};

export default LiveLineGraph;
