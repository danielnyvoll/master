import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';

const Soccer = () => {
    const playerRef = useRef();
    const [command, setCommand] = useState(''); 

    const handlePlayerCollisionEnter = (event) => {
        
    };

    const handlePlayerCollisionExit = (event) => {
        
    };

    const handleCommandChange = (e) => {
        setCommand(e.target.value);
    };

    const handleCommandSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleCommandSubmit} style={{ position: 'absolute', zIndex: 1 }}>
                <input type="text" value={command} onChange={handleCommandChange} placeholder="Enter command" />
            </form>
        <Canvas 
    >
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <OrbitControls />
            <Suspense>
            <Physics debug>
                <Player 
                    onCollisionEnter={handlePlayerCollisionEnter} 
                    onCollisionExit={handlePlayerCollisionExit}
                    command={command} 
                />
                <Ball playerRef={playerRef} />
                <Field />
            </Physics>
            </Suspense>
        </Canvas>
        </>
    );
};

export default Soccer;
