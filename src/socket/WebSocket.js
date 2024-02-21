import { useCallback, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setCommand } from '../store';
const wsUrl = 'http://127.0.0.1:5000';

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
  }, []); 
  
    const sendPositions = useCallback(({ playerPosition, ballPosition, isGoal }) => {
        if (socket.current.connected) {
            socket.current.emit('update_positions', { playerPosition, ballPosition, isGoal });
        }
    }, []);

    return { sendPositions };
};
