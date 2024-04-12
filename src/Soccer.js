import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useSelector, useDispatch } from 'react-redux';
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';
import Goal from './components/Goal';
import Cone from './components/Cone';
import { incrementScenarioIndex } from './store';
// Assume CanvasSnapshot is properly imported here
import CanvasSnapshot from './utils/CanvasSnapshot';

const Soccer = () => {
    const dispatch = useDispatch();
    const currentScenarioIndex = useSelector((state) => state.scenarios.currentScenarioIndex);
    const currentScenario = useSelector((state) => state.scenarios.list[currentScenarioIndex]);
    const next = useSelector((state) => state.next);

    // Condition to check if it's the first scenario or if 'next' is true
    const shouldBuildScenario = currentScenarioIndex === 0 || next;
    useEffect(() => {
        if (next) {
            dispatch(incrementScenarioIndex());
        }
    }, [next, dispatch])

    return (
        <Canvas
            gl={{ preserveDrawingBuffer: true }}
            style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [0,0,0] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <Suspense fallback={null}>
                <Physics debug>
                    {currentScenario.objects.map((object, index) => {
                        const positionWithAdjustedY = [object.position[0], object.position[1] + 0.1, object.position[2]];
                        switch (object.type) {
                            case 'Player': return <Player key={index} position={positionWithAdjustedY}/>;
                            case 'Ball': return <Ball key={index} position={positionWithAdjustedY} />;
                            case 'Cone': return <Cone key={index} position={positionWithAdjustedY} />;
                            default: return null;
                        }
                    })}
                    <Goal rotation={[0, -Math.PI / 2, 0]} position={[-121 / 2, 2.44 / 2, 0]} />
                    <Goal rotation={[0, Math.PI / 2, 0]} position={[121 / 2, 2.44 / 2, 0]} />
                    <Field />
                </Physics>
            </Suspense>
            <CanvasSnapshot />
        </Canvas>
    );
};

export default Soccer;
