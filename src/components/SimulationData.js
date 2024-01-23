import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'; // Adjust this URL to your server's address

function LiveSimulation() {
  const [simulationData, setSimulationData] = useState({});

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('simulation_data', data => {
      console.log('Simulation data received:', data);
      setSimulationData(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Live Simulation Data</h2>
      <pre>{JSON.stringify(simulationData, null, 2)}</pre>
    </div>
  );
}

export default LiveSimulation;
