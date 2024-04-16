import { useCallback, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setCommand, setOppositeCommand, setNext, setReset, setReward } from '../store';  // Ensure you have setOppositeCommand action
const wsUrl = 'http://127.0.0.1:5000';

export const useWebSocket = () => {
    const dispatch = useDispatch();
    const socket = useRef(null);
    const start = useSelector(state => state.start); 
    const playerPosition = useSelector(state => state.playerPosition);
    const oppositePlayerPosition = useSelector(state => state.oppositePlayerPosition);
    const ballPosition = useSelector(state => state.ballPosition);
    const isGoal = useSelector(state => state.goal);

    useEffect(() => {
      socket.current = io(wsUrl, { transports: ['websocket'] });
      socket.current.on('command', (commands) => {
        console.log("Received commands:", commands);
        dispatch(setCommand(commands.player));
        dispatch(setOppositeCommand(commands.opponent));
      });
      socket.current.on('reward', (reward) => {
        dispatch(setReward(reward));
      });
      socket.current.on('reset', (response) => {
        console.log(response);
        dispatch(setReset(response));
        dispatch(setReset(false));
      });
      socket.current.on('next', (next) => {
        if(next){
            dispatch(setNext(next));
        }
      });
  
      return () => {
          socket.current.disconnect();
      };
    }, [dispatch]); 
  
    const sendCanvasImage = useCallback((imageBase64) => {
            socket.current.emit('send_image', {
                image: imageBase64,
                playerPosition: playerPosition,
                oppositePlayerPosition: oppositePlayerPosition,
                ballPosition: ballPosition,
                isGoal: isGoal
            });
    }, [playerPosition, oppositePlayerPosition, ballPosition, isGoal]);

    return { sendCanvasImage };
};
