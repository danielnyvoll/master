import React, { useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Sphere } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useWebSocket } from '../socket/WebSocket';

const Ball = ({ onGoalScored }) => {
    const [ballPosition, setBallPosition] = useState([0, 5, 0]);
    const ballRef = useRef();
    const { sendBallPosition } = useWebSocket();
    useFrame(() => {
        try {
            const ballPosition = ballRef.current.translation();
            sendBallPosition(ballPosition);
        } catch (error) {
            console.log("Error updating ball position:", error);
        }
    });

    const handleGoalScored = () => {
        console.log("Ball Cliked");
        console.log(onGoalScored);
        // Call the onGoalScored function passed from the parent component
        if (typeof onGoalScored === 'function') {
            onGoalScored();
            console.log(ballPosition)
            setBallPosition([0,5,0]);

        }
    };

    return (
        <RigidBody position={ballPosition} colliders={"ball"} name="ball" ref={ballRef} restitution={1.2} >
            <Sphere args={[0.3]} onClick={handleGoalScored}>
                <meshStandardMaterial color="hotpink" />
            </Sphere>
        </RigidBody>
    );
};

export default Ball;
