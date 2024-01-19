import { Box, OrbitControls, Sphere, useKeyboardControls } from "@react-three/drei";
import { RigidBody, vec3 } from "@react-three/rapier";
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

        if (!(rightPressed || leftPressed || forwardPressed || backPressed)) {
            return ;
        }

        let max_speed = 7.5;
        let acceleration = 0.5;

        let impulse = vec3({ x: 0, y: 0, z: 0 });
        

        if(rightPressed) {
            impulse = impulse.add({ x: 0, y: 0, z: -acceleration });
        }

        if(leftPressed) {
            impulse = impulse.add({ x: 0, y: 0, z: acceleration });
        }

        if(forwardPressed) {
            impulse = impulse.add({ x: -acceleration, y: 0, z: 0 });
        }

        if(backPressed) {
            impulse = impulse.add({ x: acceleration, y: 0, z: 0 });
        }

        cube.current.applyImpulse(impulse, true);

        let current_velocity = vec3(cube.current.linvel());
        let current_speed = current_velocity.length();
        let max_speed_factor = max_speed / Math.max(current_speed, 0.5);

        if (current_speed > max_speed) {
            cube.current.setLinvel(current_velocity.multiplyScalar(max_speed_factor), true);
        }

    };

    const ball = useRef();

    const kick = () => {

        let cube_pos = vec3(cube.current.translation());
        let ball_pos = vec3(ball.current.translation());
        let direction = ball_pos.sub(cube_pos).normalize().multiplyScalar(2.0);

        ball.current.applyImpulse(direction, true);
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
            restitution={1.2}
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

            <RigidBody
            type="fixed"
            name="floor"
            friction={1.2}
            >
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