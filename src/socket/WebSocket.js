import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Soccer from '../Soccer';

const wsUrl = 'http://127.0.0.1:5000'; // Your server URL

export const useWebSocket = () => {
  const socket = useRef(null);
  const [command, setCommand] = useState('');

  useEffect(() => {
    // Initialize WebSocket connection
    socket.current = io(wsUrl);

    // Event listener for when connection is established
    socket.current.on('connect', () => {
      console.log('WebSocket Connected');
    });

    // Event listener for when connection is disconnected
    socket.current.on('disconnect', () => {
      console.log('WebSocket Disconnected');
    });

    // Event listener for receiving commands
    socket.current.on('command', (cmd) => {
      window.handleWebSocketCommand(cmd);
      setCommand(cmd); // Update the command state
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect(); // Disconnect WebSocket
      }
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to send player position via WebSocket
  const sendPlayerPosition = (position) => {
    socket.current.emit('update_player_position', position);
  };

  // Function to send ball position via WebSocket
  const sendBallPosition = (position) => {
    socket.current.emit('update_ball_position', position);
  };

  return { command, sendBallPosition, sendPlayerPosition };
};
