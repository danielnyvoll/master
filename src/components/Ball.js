import { useRef } from 'react';
import { RigidBody, vec3 } from '@react-three/rapier';
import { Sphere } from "@react-three/drei";
import { calculateKickImpulse } from '../utils/physics';
const Ball = ({ onCollisionEnter, playerRef }) => {
    const ballRef = useRef();

    // Function to handle the kicking of the ball
    const kick = () => {
        let impulse = calculateKickImpulse(playerRef, ballRef);
        ballRef.current.applyImpulse(impulse, true);
    };

    // Add the kicking logic to the collision event handler
    const handleCollisionEnter = (event) => {
        if (event.other.rigidBodyObject.name === "player") {
            kick();
        }
        if (onCollisionEnter) {
            onCollisionEnter(event);
        }
    };

    return (
        <RigidBody
            position={[0, 5, 0]} 
            colliders={"ball"} 
            name="ball" 
            ref={ballRef}
            restitution={1.2}
            onCollisionEnter={handleCollisionEnter}
        >
            <Sphere args={[0.3]}>
                <meshStandardMaterial color="hotpink" />
            </Sphere>
        </RigidBody>
    );
};

export default Ball;
