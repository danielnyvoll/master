import React, { useRef } from 'react';
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { calculateMovementImpulse } from '../utils/physics';
import { useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerPosition } from '../store';


const Player = ( {position}) => {
    const dispatch = useDispatch();
    const command = useSelector((state) => state.command);
    const playerRef = useRef();
    
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
                    return;
            }

            try {
                const impulse = calculateMovementImpulse(directions, 0.5, 7.5, playerRef);
                playerRef.current.applyImpulse(impulse, true);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Command must be a string');
        }
    };
    executeCommand(command);


    useFrame((_state, delta) => {
        if (playerRef.current) {
            try {
                const { x, y, z } = playerRef.current.translation();
                dispatch(setPlayerPosition({ x, y, z }));
            } catch (error) {
                console.log("Error while sending ball position:", error);
            }
        }
    });

    return (
        <RigidBody position={position} name="player" ref={playerRef} lockRotations={true}>
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial />
            </Box>
        </RigidBody>
    );
};

export default Player;
