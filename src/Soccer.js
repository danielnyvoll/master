import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useSelector, useDispatch } from 'react-redux';
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';
import Goal from './components/Goal';
import Cone from './components/Cone';
import OpponentPlayer from './components/OpponentPlayer';
import CanvasSnapshot from './utils/CanvasSnapshot';
import { setMultiplayer } from './store';

const Soccer = () => {
    const dispatch = useDispatch();
    const scenarios = useSelector((state) => state.scenarios.list);
    const currentScenarioIndex = useSelector((state) => state.scenarios.currentScenarioIndex);
    const currentScenario = scenarios[currentScenarioIndex];
    let playerCount = 0;
    const getRandomPosition = () => {
        const x = Math.random() * (fieldLength - 4) - (fieldLength / 2 - 2); // Center the position and leave space for walls
        const z = Math.random() * (fieldWidth - 4) - (fieldWidth / 2 - 2);
        return [x, 1, z];
    };
    const fieldLength = 120;
    const fieldWidth = 70;
    // Random positions for player and ball
    const playerPosition = getRandomPosition();
    const ballPosition = getRandomPosition();
    return (
        <Canvas
            gl={{ preserveDrawingBuffer: true }}
            style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [0, 0, 0] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <Suspense fallback={null}>
                <Physics>
                    <OpponentPlayer position={[-81 / 2, 2.44 / 2, 0]} />;
                    <Ball position={[-80 / 2, 2.44 / 2, 2]} />;
                    <Goal rotation={[0, -Math.PI / 2, 0]} position={[-121 / 2, 2.44 / 2, 0]} isBlue={true}/>
                    <Goal rotation={[0, Math.PI / 2, 0]} position={[121 / 2, 2.44 / 2, 0]} isBlue={false}/>
                    <Field />
                </Physics>
            </Suspense>
            <CanvasSnapshot />
        </Canvas>
    );
};

export default Soccer;