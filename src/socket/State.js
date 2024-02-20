// /src/socket/State.js

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebSocket } from './WebSocket';

export const useSendCombinedPositions = () => {
    const playerPosition = useSelector(state => state.playerPosition);
    const ballPosition = useSelector(state => state.ballPosition);
    const { sendPositions } = useWebSocket();

    useEffect(() => {
        console.log("player: " + playerPosition);
        console.log("ball: " + ballPosition);
        sendPositions({ playerPosition, ballPosition });
    }, [playerPosition, ballPosition, sendPositions]);
};
