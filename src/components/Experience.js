import { Box, OrbitControls, Sphere, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Controls } from "../App";
import { useFrame } from "@react-three/fiber";

export const Experience = () => {

    const [hover, setHover] = useState(false);
    const cube = useRef();
    const jump = () => {
        if(isOnFloor.current) {
            cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
        }
    };

    const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);

    useFrame((_state, delta) => {
        if(jumpPressed) {
            jump();
        }
    });

    const isOnFloor = useRef(true);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <OrbitControls />
            
            <RigidBody position={[0, 5, 0]} colliders={"ball"}>
                <Sphere>
                    <meshStandardMaterial color="hotpink" />
                </Sphere>
            </RigidBody>

            <RigidBody position={[3, 5, 0]}
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

                    onClick={jump}
                >
                    <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
                </Box>
            </RigidBody>

            <RigidBody type="fixed" name="floor">
                <Box position={[0, 0, 0]} args={[10, 1, 10]}>
                    <meshStandardMaterial color="springgreen" />
                </Box>
            </RigidBody>
        </>
    );
};