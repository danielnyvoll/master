import React, { useRef } from 'react';
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
        if (typeof cmd === 'string' && playerRef.current) {
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

                playerRef.current.setAngvel({x: 0, y: 0, z:0}, true);

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

                playerRef.current.setAngvel({x: 0, y: 0, z:0}, true);

                const { x, y, z } = playerRef.current.translation();

                const rotationQuaternion = new THREE.Quaternion(playerRef.current.rotation().x, playerRef.current.rotation().y, playerRef.current.rotation().z, playerRef.current.rotation().w);

                const forwardVector = new THREE.Vector3(1, 0, 0).applyQuaternion(rotationQuaternion);

                //const camerapos = new THREE.Vector3(x, y, z);

                //const forwardVector = camerapos.add(new THREE.Vector3(1, 0, 0));
                
                //const rotatedDirection = forwardVector.clone().applyQuaternion(rotationQuaternion);

                let movementVec = new THREE.Vector3(forwardVector.x, 0, forwardVector.z);

                if (move.backward) {
                    movementVec =new THREE.Vector3(-forwardVector.x, 0, -forwardVector.z);
                }

                movementVec = movementVec.multiplyScalar(10);

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

            const camerapos = new THREE.Vector3(x, y + 1, z);

            const forwardVector = new THREE.Vector3(1, 0, 0).applyQuaternion(rotationQuaternion);


            //const forwardVector = camerapos.add(new THREE.Vector3(1, 0, 0));

            //const rotatedDirection = forwardVector.clone().applyQuaternion(rotationQuaternion);

            const rotatedDirection = camerapos.add(forwardVector);

            const middle = new THREE.Vector3(0,0,0);

            state.camera.lookAt(middle);
        
            //state.camera.position.x = x;
            //state.camera.position.y = y + 1.5;
            //state.camera.position.z = z;

            state.camera.position.x = 0;
            state.camera.position.y = 50;
            state.camera.position.z = 20;

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