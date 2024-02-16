import React, { useEffect, useRef, useState } from 'react';
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { calculateMovementImpulse } from '../utils/physics';
import { useWebSocket } from '../socket/WebSocket';
import { useFrame } from '@react-three/fiber';

const Player = () => {
    const { sendPlayerPosition } = useWebSocket();
    const playerRef = useRef();
    const [command, setCommand] = useState("");

    const handleWebSocketCommand = (cmd) => {
        executeCommand(cmd);
        setCommand(cmd);
    };

    useEffect(() => {
        window.handleWebSocketCommand = handleWebSocketCommand;
        return () => {
            delete window.handleWebSocketCommand;
        };
    }, [handleWebSocketCommand]);
    

    const executeCommand = (cmd) => {
        if (typeof cmd === 'string') {
            let directions = { forward: false, backward: false, left: false, right: false };
    
            switch (cmd.toLowerCase()) {
                case "up":
                    directions.forward = true;
                    break;
                case "down":
                    directions.backward = true;
                    break;
                case "left":
                    directions.left = true;
                    break;
                case "right":
                    directions.right = true;
                    break;
                default:
                    console.error(`Unexpected command: ${cmd}`);
                    break;
            }
    
            const impulse = calculateMovementImpulse(directions, 0.5, 7.5, playerRef);
            playerRef.current.applyImpulse(impulse, true);
        } else {
            console.log('Command must be a string');
        }
    };
    
    useEffect(() => {
        executeCommand(command);
    }, [command]);
    
    useFrame((_state, delta) => {
        try {
            let playerPosition = playerRef.current.translation();
            sendPlayerPosition(playerPosition);
        } catch (error) {
            console.log("Error while sending player position:", error);
        }
    });

    return (
        <RigidBody
            position={[3, 5, 0]}
            name="player"
            ref={playerRef}
            lockRotations={true}>
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial />
            </Box>
        </RigidBody>
    );
};

export default Player;
