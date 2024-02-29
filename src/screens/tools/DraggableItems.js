import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import Ball from '../../components/Ball';
import Player from '../../components/Player';
import { OrbitControls } from "@react-three/drei";
import Cone from '../../components/Cone';

const Scene = () => {
    return (
        <div className="canvas-container">
            <Canvas className="single-canvas">
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Physics>
                    {/* Thick Green Platform for the Ball */}
                    {/* Adjust args for size and thickness */}
                    <RigidBody type="fixed" name="floor" friction={1.2}>
                        <Box args={[15, 0.2, 3]} position={[0, -0.1, 0]}>
                        <meshStandardMaterial attach="material" color="green" />
                        </Box>
                    </RigidBody>
                    <Ball position={[1,4.5,10]}></Ball>
                    <Player command={""}></Player>
                    <Cone position={[-2,0,0]}></Cone>         
                </Physics>
            </Canvas>
        </div>
    );
};

export default Scene;