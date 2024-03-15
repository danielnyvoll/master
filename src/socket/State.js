// /src/socket/State.js

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebSocket } from './WebSocket';
import { vision } from '../utils/playerLim';

export const useSendCombinedPositions = () => {
    const playerPosition = useSelector(state => state.playerPosition);
    const ballPosition = useSelector(state => state.ballPosition);
    const isGoal = useSelector(state => state.goal);
    const { sendPositions } = useWebSocket();

    const { direction, distance} = vision(playerPosition, ballPosition);

    useEffect(() => {
        sendPositions({ direction, distance, isGoal });
    }, [direction, distance, isGoal, sendPositions]);
};
