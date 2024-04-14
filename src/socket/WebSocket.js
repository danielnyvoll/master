import { useCallback, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setCommand, setNext, setReset, setReward } from '../store';
const wsUrl = 'http://127.0.0.1:5000';

export const useWebSocket = () => {
    const dispatch = useDispatch();
    const socket = useRef(null);
    const playerPosition = useSelector(state => state.playerPosition);
    const gameState = useSelector(state => state.gameState);
    const ballPosition = useSelector(state => state.ballPosition);
    const isGoal = useSelector(state => state.goal);
    const start = useSelector(state => state.start); 

    useEffect(() => {
      socket.current = io(wsUrl, { transports: ['websocket'] });
      socket.current.on('command', (command) => {
        console.log("Mottat kommando:");
          console.log(command);
          dispatch(setCommand(command));
      });
      socket.current.on('reward', (reward) => {
        console.log(reward);
        dispatch(setReward(reward));
    });
      socket.current.on('reset', (response) => {
        if (response) {
            console.log('Received reset:', response);
            dispatch(setReset(response));
            dispatch(setReset(false));
        }
    });
    socket.current.on('next', (next) => {
        if(next){
            dispatch(setNext(next));
            dispatch(setNext(false));
        }
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

    const sendCanvasImage = useCallback((imageBase64) => {
        if (start) {
            socket.current.emit('send_image', {
                image: imageBase64,
                gameState,
                ballPosition,
                isGoal
            });}
    }, [gameState, ballPosition, isGoal]);

    return { sendPositions, sendCanvasImage };
};
