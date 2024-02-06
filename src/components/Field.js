import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Box, Torus } from "@react-three/drei";


const Field = () => {
    const fieldLength = 90; // 30 * 3
    const fieldWidth = 60; // 20 * 3
    const goalDepth = 5;
    const goalWidth = 7.32; // Standard goal width
    const goalHeight = 2.44; // Standard goal height
    const centerCircleRadius = 9.15; // Standard center circle radius


    return (
        <>
            {/* Field */}
            <RigidBody type="fixed" name="floor" friction={1.2}>

                <Box position={[0, 0, 0]} args={[fieldLength, 1, fieldWidth]}>
                    <meshStandardMaterial color="springgreen" />
                </Box>
            </RigidBody>

            {/* Field Lines - Sidelines and Half-line */}
            <Box position={[0, 0.5, fieldWidth / 2]} args={[fieldLength, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
            <Box position={[0, 0.5, -fieldWidth / 2]} args={[fieldLength, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
            <Box position={[fieldLength / 2, 0.5, 0]} args={[0.2, 0.1, fieldWidth]}><meshStandardMaterial color="white" /></Box>
            <Box position={[-fieldLength / 2, 0.5, 0]} args={[0.2, 0.1, fieldWidth]}><meshStandardMaterial color="white" /></Box>
            <Box position={[0, 0.5, 0]} args={[0.2, 0.1, fieldWidth]}><meshStandardMaterial color="white" /></Box>

            {/* Center Circle */}
            <Torus position={[0, 0.5, 0]} args={[centerCircleRadius, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="white" />
            </Torus>

            {/* Walls */}
            <RigidBody type="fixed">
                {/* Horizontal Walls */}
                <Box position={[fieldLength / 2 + 0.5, 2, 0]} args={[1, 5, fieldWidth]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[-fieldLength / 2 - 0.5, 2, 0]} args={[1, 5, fieldWidth]}><meshStandardMaterial visible={false} /></Box>
                {/* Vertical Walls */}
                <Box position={[0, 2, fieldWidth / 2 + 0.5]} args={[fieldLength, 5, 1]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[0, 2, -fieldWidth / 2 - 0.5]} args={[fieldLength, 5, 1]}><meshStandardMaterial visible={false} /></Box>
            </RigidBody>

            {/* Goalposts - Visual Representation */}
            <RigidBody type="fixed">
                {/* Left Goalpost Frame */}
                <Box position={[-fieldLength / 2, goalHeight / 2, 0]} args={[0.2, goalHeight, goalWidth + 0.4]}>
                    <meshStandardMaterial color="black" />
                </Box>
                {/* Right Goalpost Frame */}
                <Box position={[fieldLength / 2, goalHeight / 2, 0]} args={[0.2, goalHeight, goalWidth + 0.4]}>
                    <meshStandardMaterial color="black" />
                </Box>
            </RigidBody>

            {/* Goalposts - Colliders */}
            <RigidBody type="fixed">
                {/* Left Goalpost Collider */}
                <CuboidCollider position={[-fieldLength / 2, goalHeight / 2, 0]} args={[goalDepth, goalHeight, goalWidth]} sensor onIntersectionEnter={() => console.log("Goal in Left Post!")} />
                {/* Right Goalpost Collider */}
                <CuboidCollider position={[fieldLength / 2, goalHeight / 2, 0]} args={[goalDepth, goalHeight, goalWidth]} sensor onIntersectionEnter={() => console.log("Goal in Right Post!")} />
            </RigidBody>
        </>
    );
};

export default Field;

