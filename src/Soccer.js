import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from './components/Player';
import Ball from './components/Ball';
import Field from './components/Field';

//import { LiveSimulation } from './utils/SimulationData';
//const simulation = LiveSimulation();

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

    /*
    Example from coordinates

    const [simulationData, setSimulationData] = useState({});

    useEffect(() => {
        simulation.start((data) => {
            setSimulationData(data);
        });

        return () => {
            simulation.disconnect();
        };
    }, []);

    useFrame((_state, delta) => {
        try{
            let ballposition = parseJsonObject(simulationData, "ball");
            ball.current.position.set(ballposition.x, 1,ballposition.z);
        } catch (error) {
            return `Error getting ball position: ${error.message}`;
        }

        try{
            let playerposition = parseJsonObject(simulationData, "player");
            player.current.position.set(playerposition.x, 1,playerposition.z);
        } catch (error) {
            return `Error getting ball position: ${error.message}`;
        }
    });
    */

    return (
        <>
            
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
