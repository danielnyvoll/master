import React, { useRef } from 'react';
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { calculateMovementImpulse } from '../utils/physics';
import { useFrame, useThree } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { setCommand, setPlayerPosition } from '../store';
import { ShotVector } from '../utils/playerLim';
import * as THREE from 'three';

const Player = () => {
    const dispatch = useDispatch();
    const command = useSelector((state) => state.command);
    const playerPosition = useSelector(state => state.playerPosition);
    const ballPosition = useSelector(state => state.ballPosition);
    const playerRef = useRef();
    var rotation = 0;
    
    const executeCommand = (cmd) => {
        if (typeof cmd === 'string') {
            let move = { move: false, forward: false };
            let turn = { turn : false, left: false, right: false};
            let actions = { action: false, shoot: false, dribble: false };

            switch (cmd.toLowerCase()) {
                case "up":
                    move.move = true;
                    move.forward = true;
                    break;
                case "down":
                    move.move = true;
                    move.backward = true;
                    break;
                case "left":
                    turn.turn = true;
                    turn.left = true;
                    break;
                case "right":
                    turn.turn = true;
                    turn.right = true;
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
            else if (move.move) {


                const rotationQuaternion = new THREE.Quaternion(playerRef.current.rotation().x, playerRef.current.rotation().y, playerRef.current.rotation().z, playerRef.current.rotation().w);

                const camerapos = new THREE.Vector3(ballPosition.x, ballPosition.y, ballPosition.z);

                const forwardVector = camerapos.add(new THREE.Vector3(1, 0, 0));

                const rotatedDirection = forwardVector.clone().applyQuaternion(rotationQuaternion);

                let movementVec = new THREE.Vector3(rotatedDirection.x, 0, rotatedDirection.z);

                if (move.backward) {
                    movementVec =new THREE.Vector3(-rotatedDirection.x, 0, -rotatedDirection.z);
                }

                const impulse = calculateMovementImpulse(movementVec, 12.5, playerRef);

                playerRef.current.applyImpulse(impulse, true);
            }
            else if (turn.turn) {
                let rotationvec = {x: 0, y: 5, z: 0};
                if (turn.right) {
                    rotationvec = {x: 0, y: -5, z: 0};
                }
                playerRef.current.setAngvel(rotationvec, true);
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

            const rotationQuaternion = new THREE.Quaternion(playerRef.current.rotation().x, playerRef.current.rotation().y, playerRef.current.rotation().z, playerRef.current.rotation().w);

            const camerapos = new THREE.Vector3(ballPosition.x, ballPosition.y + 1, ballPosition.z);

            const forwardVector = camerapos.add(new THREE.Vector3(1, 0, 0));

            const rotatedDirection = forwardVector.clone().applyQuaternion(rotationQuaternion);


            state.camera.lookAt(rotatedDirection);
        
            state.camera.position.x = x;
            state.camera.position.y = y + 2;
            state.camera.position.z = z;

            state.camera.updateProjectionMatrix()
        }
    });

    useFrame((_state, delta) => {

        if (playerRef.current) {

            playerRef.current.setAngvel(new THREE.Vector3(0, playerRef.current.angvel().y, 0), true);

            try {
                const { x, y, z } = playerRef.current.translation();
                dispatch(setPlayerPosition({ x, y, z }));
            } catch (error) {
                console.log("Error while sending ball position:", error);
            }
        }
    });

    return (
        <RigidBody position={[3, 1, 0]} name="player" ref={playerRef} >
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial />
            </Box>
        </RigidBody>
    );
};

export default Player;
