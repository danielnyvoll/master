import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Torus, Circle } from "@react-three/drei";

const Field = () => {
    const fieldLength = 120;
    const fieldWidth = 70;
    const fiveMeterBox = 5.5;
    const sixteenMeterBox = 16.5;
    const sixteenMeterBoxLenght = 29;
    const centerCircleRadius = 9.15;
    const penaltySpotDistance = 11;

    return (
        <>
             <RigidBody type="fixed" name="floor" friction={1.2}>
                {/* Field */}
                <Box position={[0, 0, 0]} args={[fieldLength, 1, fieldWidth]}>
                    <meshStandardMaterial color="springgreen" />
                </Box>
                
            </RigidBody>
                <Box position={[-fieldLength/2.32, 0.5, sixteenMeterBox]} args={[sixteenMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
                <Box position={[fieldLength/2.32, 0.5, sixteenMeterBox]} args={[sixteenMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
                
                <Box position={[-fieldLength/2.32, 0.5, -sixteenMeterBox]} args={[sixteenMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
                <Box position={[fieldLength/2.32, 0.5, -sixteenMeterBox]} args={[sixteenMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>

                <Box position={[fieldLength/2 - sixteenMeterBox, 0.5, 0]} args={[0.2, 0.1, sixteenMeterBoxLenght+4]}><meshStandardMaterial color="white" /></Box>
                <Box position={[-fieldLength/2 + sixteenMeterBox, 0.5, 0]} args={[0.2, 0.1, sixteenMeterBoxLenght+4]}><meshStandardMaterial color="white" /></Box>


                <Box position={[-fieldLength/2 + fiveMeterBox, 0.5, 0]} args={[0.2, 0.1, fiveMeterBox*2]}><meshStandardMaterial color="white" /></Box>              
                <Box position={[-fieldLength/2.1, 0.5, - fiveMeterBox]} args={[fiveMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
                <Box position={[-fieldLength/2.1, 0.5, + fiveMeterBox]} args={[fiveMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
               
                <Box position={[fieldLength/2 - fiveMeterBox, 0.5, 0]} args={[0.2, 0.1, fiveMeterBox*2]}><meshStandardMaterial color="white" /></Box>              
                <Box position={[fieldLength/2.1, 0.5, + fiveMeterBox]} args={[fiveMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
                <Box position={[fieldLength/2.1, 0.5, - fiveMeterBox]} args={[fiveMeterBox, 0.1, 0.2]}><meshStandardMaterial color="white" /></Box>
                

                <Circle args={[0.3, 32]} position={[fieldLength/2 - penaltySpotDistance, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial attach="material" color="grey" />
                </Circle>

                <Circle args={[0.3, 32]} position={[-fieldLength/2 + penaltySpotDistance, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial attach="material" color="grey"/>
                </Circle>

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

                <Box position={[fieldLength / 2 + 0.5, 2, 0]} args={[1, 8, fieldWidth]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[-fieldLength / 2 - 0.5, 2, 0]} args={[1, 8, fieldWidth]}><meshStandardMaterial visible={false} /></Box>

                {/*
                <Box position={[fieldLength / 2 + 0.5, 2, 20]} args={[1, 5, fieldWidth/2.25]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[fieldLength / 2 + 0.5, 2, -20]} args={[1, 5, fieldWidth/2.25]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[fieldLength / 2 + 1.5, 3, 0]} args={[1, 6, 9]}><meshStandardMaterial visible={false} /></Box>


                <Box position={[-fieldLength / 2 - 0.5, 2, 20]} args={[1, 5, fieldWidth/2.25]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[-fieldLength / 2 - 0.5, 2, -20]} args={[1, 5, fieldWidth/2.25]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[-fieldLength / 2 - 1.5, 3, 0]} args={[1, 6, 9]}><meshStandardMaterial visible={false} /></Box>
                */}

                {/* Vertical Walls */}
                <Box position={[0, 2, fieldWidth  / 2 + 0.5]} args={[fieldLength, 8, 1]}><meshStandardMaterial visible={false} /></Box>
                <Box position={[0, 2, -fieldWidth / 2 - 0.5]} args={[fieldLength, 8, 1]}><meshStandardMaterial visible={false} /></Box>
            </RigidBody>
            



          
        </>
    );
};

export default Field;

