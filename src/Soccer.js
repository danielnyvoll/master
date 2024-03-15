// Soccer.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { useSelector } from 'react-redux';
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';
import Goal from './components/Goal';
import Cone from './components/Cone';


const Soccer = () => {

    const currentScenarioIndex = useSelector(state => state.scenarios.currentScenarioIndex);
    const currentScenario = useSelector(state => state.scenarios.list[currentScenarioIndex]);

    return (
        <Canvas
            style={{ width: '100vw', height: '100vh'}}
            camera={{ position: [0, 10, 20] }}
        >
             <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <Suspense fallback={null}>
                <Physics debug>
                    {currentScenario.objects.map((object) => {
                        // Create a new position array with Y increased by 2
                        const positionWithAdjustedY = [object.position[0], object.position[1] + 0.1, object.position[2]];
                        
                        switch (object.type) {
                            case 'Player':
                                return <Player key={object.id} position={positionWithAdjustedY} />;
                            case 'Ball':
                                return <Ball key={object.id} position={positionWithAdjustedY} />;
                            case 'Cone':
                                return <Cone key={object.id} position={positionWithAdjustedY} />;
                            default:
                                return null;
                        }
                    })}
                    <Goal rotation={[0, -Math.PI / 2, 0]} position={[-121 / 2, 2.44 / 2, 0]}  />
                    <Goal rotation={[0, Math.PI / 2, 0]} position={[121 / 2, 2.44 / 2, 0]}  />
                    <Field />
                    <OrbitControls
                        enableKeys={true}
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                    />
                </Physics>
            </Suspense>
        </Canvas>
    );
};

export default Soccer;
