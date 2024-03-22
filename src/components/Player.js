import React, { useRef, useEffect } from 'react';
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { calculateMovementImpulse } from '../utils/physics';
import { useFrame, useThree } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { ShotVector } from '../utils/playerLim';
import { setCommand, setPlayerPosition } from '../store';

import * as THREE from 'three';

const Player = ( {position}) => {
    const dispatch = useDispatch();
    const command = useSelector((state) => state.command);
    const playerPosition = useSelector(state => state.playerPosition);
    const ballPosition = useSelector(state => state.ballPosition);
    const playerRef = useRef();
    
    const executeCommand = (cmd) => {
        if (typeof cmd === 'string') {
            let directions = { forward: false, backward: false, left: false, right: false };
            let actions = { action: false, shoot: false, dribble: false };

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
                case "shoot":
                    actions.action = true;
                    actions.shoot = true;
                    playerRef.current.name = "shooter";
                    break;
                case "dribble":
                    actions.action = true;
                    actions.dribble = true;
                    playerRef.current.name = "dribbler";
                    break;
                default:
                    console.error(`Unexpected command: ${cmd}`);
                    return;
            }

            if (actions.action) {
                let param = 1;
                switch (actions) {
                    case actions.shoot:
                        param = 100;
                    case actions.dribble:
                        param = 1;
                }

                let impulse = ShotVector(playerPosition, ballPosition, param);
                playerRef.current.applyImpulse(impulse, true);
            }
            else {
                try {
                    const impulse = calculateMovementImpulse(directions, 1.0, 10.5, playerRef);
                    playerRef.current.applyImpulse(impulse, true);
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            console.log('Command must be a string');
        }
        dispatch(setCommand(''));
    };
    executeCommand(command);

    useThree((state) => {

        if (playerRef.current) {
            const { x, y, z } = playerRef.current.translation();
            const playervec = new THREE.Vector3(x, y, z);
            const ballvec = new THREE.Vector3(ballPosition.x, ballPosition.y, ballPosition.z);

            state.camera.lookAt(ballvec);
        
            state.camera.position.x = x;
            state.camera.position.y = y + 2;
            state.camera.position.z = z;

            state.camera.updateProjectionMatrix()
        }
    });

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