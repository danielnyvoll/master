import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import { calculateMovementImpulse } from '../utils/physics';
import { useEffect, useRef } from 'react';


const Player = ({ onCollisionEnter, onCollisionExit, command }) => {
    const playerRef = useRef();
    console.log(command); 

        
    useEffect(() => {
        const executeCommand = (cmd) => {
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
                    // Handle unexpected commands (e.g., log an error message)
                    console.error(`Unexpected command: ${cmd}`);
                    break;
                // Add more cases if needed
            }
    
            const impulse = calculateMovementImpulse(directions, 0.5, 7.5, playerRef);
            playerRef.current.applyImpulse(impulse, true);
        };
    
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