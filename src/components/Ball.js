import React, { useRef, useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Sphere } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { setBallPosition } from '../store';

const Ball = ({ onGoalScored }) => {
    const dispatch = useDispatch();
    const isGoal = useSelector(state => state.goal.intersecting);
    const ballRef = useRef();

    useFrame((_state, delta) => {
        if (ballRef.current) {
            try {
                const { x, y, z } = ballRef.current.translation();
                dispatch(setBallPosition({ x, y, z }));
            } catch (error) {
                console.log("Error while sending ball position:", error);
            }
        }
    });
    
    
    useEffect(() => {
        if (isGoal && ballRef.current) {
            // Set the ball to the starting position
            ballRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
            ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
            ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true); 
        }
    }, [isGoal]);
    

    return (
        <RigidBody position={[0, 2, 10]} colliders={"ball"} name="ball" ref={ballRef} restitution={1.2} friction={5.2}>
            <Sphere args={[0.3]}>
                <meshStandardMaterial color="hotpink" />
            </Sphere>
        </RigidBody>
    );
};

export default Ball;
