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
    let playerCount = 0;  // Use `let` to modify within map


    return (
        <Canvas
            gl={{ preserveDrawingBuffer: true }}
            style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [0, 0, 0] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <Suspense fallback={null}>
                <Physics debug>
                    {currentScenario.objects.map((object, index) => {
                        const positionWithAdjustedY = [object.position[0], object.position[1] + 0.1, object.position[2]];
                        if (object.type === 'Player') {
                            playerCount++;
                            if (playerCount % 2 === 1) {
                                dispatch(setMultiplayer(false));
                                return <Player key={index} position={positionWithAdjustedY} />;
                            } else {
                                dispatch(setMultiplayer(true));
                                return <OpponentPlayer key={index} position={positionWithAdjustedY} />;
                            }
                        }
                         else if (object.type === 'Ball') {
                            return <Ball key={index} position={positionWithAdjustedY} />;
                        } else if (object.type === 'Cone') {
                            return <Cone key={index} position={positionWithAdjustedY} />;
                        } else {
                            return null;
                        }
                    })}
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
