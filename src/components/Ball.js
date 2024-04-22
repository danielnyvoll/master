import React, { useRef, useEffect } from 'react';
import { RigidBody, vec3 } from '@react-three/rapier';
import { Sphere } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { setBallPosition } from '../store';

const Ball = ({ position }) => {
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
            ballRef.current.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
            ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
            ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true); 
        }
    }, [isGoal, position]);

    const kick = (shootertrans) => {

        let shooterpos = vec3(shootertrans);
        let ballpos = vec3(ballRef.current.translation());
        let direction = ballpos.sub(shooterpos).normalize().multiplyScalar(2.0);

        ballRef.current.applyImpulse(direction, true);
    };

    return (
        <RigidBody position={position} colliders={"ball"} name="ball" ref={ballRef} restitution={1.2} friction={5.2}
        onCollisionEnter={({other}) => {
            if(other.rigidBody.name === "shooter") {
                kick(other.rigidBody.translation);
            }
        }}
        >
            <Sphere args={[0.3]}>
                <meshStandardMaterial color="hotpink" />
            </Sphere>
        </RigidBody>
    );
};

export default Ball;
