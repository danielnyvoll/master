// socket/WebSocket.js
import { useCallback, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setCommand } from '../store';
const wsUrl = 'http://127.0.0.1:5000'; // Update with your actual WebSocket server URL

export const useWebSocket = () => {
    const dispatch = useDispatch();
    const socket = useRef(null);

    useEffect(() => {
      socket.current = io(wsUrl, { transports: ['websocket'] });
  
      socket.current.on('command', (command) => {
          console.log('Received command:', command);
          dispatch(setCommand(command));
      });
  
      return () => {
          if (socket.current) socket.current.disconnect();
      };
  }, []); // This ensures the setup and cleanup are only run once
  

    // Function to send combined player and ball positions
    const sendPositions = useCallback(({ playerPosition, ballPosition }) => {
        // Ensure the socket is connected before attempting to send data
        if (socket.current.connected) {
          console.log("Pos: ", playerPosition, ballPosition);
            socket.current.emit('update_positions', { playerPosition, ballPosition });
        }
    }, []);

    // Return the sendPositions function (and any other functions you need) from the hook
    return { sendPositions };
};
