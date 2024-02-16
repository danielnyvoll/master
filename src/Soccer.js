import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';
import Goal from './components/Goal';

const Soccer = () => {
    const [ballPosition, setBallPosition] = useState([0, 5, 0]); // Initial position of the ball

    const handleGoalScored = () => {
        // Update the position of the ball when a goal is scored
        setBallPosition([0, 7, 0]); // Set the new position of the ball
    };
    return (
        <Canvas
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
            camera={{ position: [0, 10, 20] }} // Set starting position of the camera
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            
            <Suspense fallback={null}>
                <Physics debug>
                    <Player/>
                    <Ball onGoalScored={handleGoalScored}/>
                    <Goal rotation={[0, -Math.PI / 2, 0]} position={[-121 / 2, 2.44 / 2+2, 0]}  />
                    <Goal rotation={[0, Math.PI / 2, 0]} position={[121 / 2, 2.44 / 2+2, 0]}  />
                    <OrbitControls
                        enableKeys={true}
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                    />
                    <Field />
                </Physics>
            </Suspense>
        </Canvas>
    );
};

export default Soccer;
