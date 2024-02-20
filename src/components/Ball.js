import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Sphere } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { setBallPosition } from '../store'; // Adjust this path to where your action creator is defined

const Ball = ({ onGoalScored }) => {
    const dispatch = useDispatch();
    const ballRef = useRef();
    // Use useSelector to retrieve the ball position from the Redux store
    //const ballPosition = useSelector(state => state.ballPosition);
    useFrame((_state, delta) => {
        if (ballRef.current) {
            try {
                // Assuming translation() returns a Vector3-like object with x, y, z properties
                const { x, y, z } = ballRef.current.translation();
                // Dispatch a plain object or array with serializable values
                dispatch(setBallPosition({ x, y, z }));
            } catch (error) {
                console.log("Error while sending ball position:", error);
            }
        }
    });
    
    

    const handleGoalScored = () => {
        console.log("Ball Clicked");
        // Call the onGoalScored function passed from the parent component
        if (typeof onGoalScored === 'function') {
            onGoalScored();
            // Reset ball position by dispatching it to the Redux store
            dispatch(setBallPosition([0, 5, 0]));
        }
    };

    return (
        <RigidBody position={[0, 5, 0]} colliders={"ball"} name="ball" ref={ballRef} restitution={1.2}>
            <Sphere args={[0.3]} onClick={handleGoalScored}>
                <meshStandardMaterial color="hotpink" />
            </Sphere>
        </RigidBody>
    );
};

export default Ball;
