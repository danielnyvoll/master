import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'; // Adjust this URL to your server's address

const LiveSimulation = () => {
  const socket = io(SERVER_URL);

  const start = (onDataReceived) => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('simulation_data', data => {
      console.log('Simulation data received:', data);
      onDataReceived(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return {
    start,
    disconnect,
  };
};

export default LiveSimulation;
