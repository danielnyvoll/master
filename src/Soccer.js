// Soccer.js
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';
import Goal from './components/Goal';
import { useSendCombinedPositions } from './socket/State';

const Soccer = () => {
    useSendCombinedPositions();

    /*
    const [resetCount, setResetCount] = useState(0);
    const x = 5;

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Increment resetCount every x seconds
            setResetCount(prevCount => prevCount + 1);
        }, x * 1000); // x is the number of seconds for reset

        // Cleanup function to clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once
    key={resetCount}
    */

    return (
        <Canvas
            
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
            camera={{ position: [0, 10, 20] }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            
            <Suspense fallback={null}>
                <Physics debug>
                    <Player/>
                    <Ball/>
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
