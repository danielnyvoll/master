import { RigidBody, vec3 } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import { calculateMovementImpulse } from '../utils/physics';
import { useEffect, useRef } from 'react';


const Player = ({ onCollisionEnter, onCollisionExit, command }) => {
    const playerRef = useRef();
    console.log(command); 
    let max_speed = 7.5;
    let acceleration = 0.5;

    let impulse = vec3({ x: 0, y: 0, z: 0 });
        
    // Define the executeCommand function
    const executeCommand = (command) => {
        
        let directions = { forward: false, backward: false, left: false, right: false };

        switch (command.toLowerCase()) {
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
            // Add more cases if needed
        }
       
        console.log(directions);
        impulse = calculateMovementImpulse(directions, 0.5, 7.5, playerRef);
        
        let current_velocity = vec3(playerRef.current.linvel());
        let current_speed = current_velocity.length();
        let max_speed_factor = max_speed / Math.max(current_speed, 0.5);

        if (current_speed > max_speed) {
            playerRef.current.setLinvel(current_velocity.multiplyScalar(max_speed_factor), true);
        }
        playerRef.current.applyImpulse(impulse, true);
    };

    useEffect(() => {
        if (command) {
            executeCommand(command);
        }
    }, [command]);

    return (
        <RigidBody
            position={[3, 5, 0]}
            name="player"
            ref={playerRef}
            onCollisionEnter={onCollisionEnter}
            onCollisionExit={onCollisionExit}
        >
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial />
            </Box>
        </RigidBody>
    );
};

export default Player;