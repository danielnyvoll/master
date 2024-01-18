import { Box, OrbitControls, Sphere, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Controls } from "../App";
import { useFrame } from "@react-three/fiber";

export const Experience = () => {

    const [hover, setHover] = useState(false);
    const cube = useRef();

    const handleMovement = () => {
        if(!isOnFloor.current) {
            return ;
        }

        if(jumpPressed) {
            cube.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
        }

        if(rightPressed) {
            cube.current.applyImpulse({ x: 0, y: 0, z: -0.15 }, true);
        }

        if(leftPressed) {
            cube.current.applyImpulse({ x: 0, y: 0, z: 0.15 }, true);
        }

        if(forwardPressed) {
            cube.current.applyImpulse({ x: -0.15, y: 0, z: 0 }, true);
        }

        if(backPressed) {
            cube.current.applyImpulse({ x: 0.15, y: 0, z: 0 }, true);
        }
    };

    const ball = useRef();

    const kick = () => {
        ball.current.applyImpulse({ x: 0, y: 0, z: 0 });
    };

    const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);
    const backPressed = useKeyboardControls((state) => state[Controls.back]);
    const rightPressed = useKeyboardControls((state) => state[Controls.right]);
    const leftPressed = useKeyboardControls((state) => state[Controls.left]);
    const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);

    useFrame((_state, delta) => {
        handleMovement();
    });

    const isOnFloor = useRef(false);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <OrbitControls />
            
            <RigidBody
            position={[0, 5, 0]} 
            colliders={"ball"} 
            name="ball" 
            ref={ball}
            restitution={2}
            onCollisionEnter={({other}) => {
                if(other.rigidBodyObject.name === "player") {
                    kick();
                }
            }}
            >
                <Sphere
                args={[0.3]}
                >
                    <meshStandardMaterial color="hotpink" />
                </Sphere>
            </RigidBody>

            <RigidBody position={[3, 5, 0]}
            name="player"
            ref={cube}
            onCollisionEnter={({other}) => {
                if(other.rigidBodyObject.name === "floor") {
                    isOnFloor.current = true;
                }
            }}
            onCollisionExit={({other}) => {
                if(other.rigidBodyObject.name === "floor") {
                    isOnFloor.current = false;
                }
            }}>
                <Box 
                    onPointerEnter={() => setHover(true)}
                    onPointerLeave={() => setHover(false)}

                    args={[1, 1, 1]}                    
                >
                    <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
                </Box>
            </RigidBody>

            <RigidBody type="fixed" name="floor">
                <Box position={[0, 0, 0]} args={[30, 1, 20]}>
                    <meshStandardMaterial color="springgreen" />
                </Box>
            </RigidBody>

            <RigidBody type="fixed">
                <Box position={[15.5, 2, 0]} args={[1, 5, 20]}>
                    <meshStandardMaterial visible={false} />
                </Box>
                <Box position={[-15.5, 2, 0]} args={[1, 5, 20]}>
                    <meshStandardMaterial visible={false} />
                </Box>
                <Box position={[0, 2, 10.5]} args={[32, 5, 1]}>
                    <meshStandardMaterial visible={false} />
                </Box>
                <Box position={[0, 2, -10.5]} args={[32, 5, 1]}>
                    <meshStandardMaterial visible={false} />
                </Box>
            </RigidBody>
        </>
    );
};