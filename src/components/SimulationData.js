import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

function LiveSimulation() {
  const [simulationData, setSimulationData] = useState({});
  const socketRef = useRef(null); // Ref to store the socket instance

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    socketRef.current.on('simulation_data', data => {
      console.log('Simulation data received:', data);
      setSimulationData(data);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socketRef.current.disconnect();
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
