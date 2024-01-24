import { Box, OrbitControls, Sphere, useKeyboardControls } from "@react-three/drei";
import { RigidBody, vec3 } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { Controls } from "../App";
import { useFrame } from "@react-three/fiber";
import LiveSimulation from "./SimulationData";

const simulation = LiveSimulation();

function parseJsonObject(jsonString, objectName) {
    let result;

    try {
        result = JSON.parse(jsonString, (key, value) => {
            if (key === objectName) {
                return value;
            } else {
                return value;
            }
        });
    } catch (error) {
        return `Error parsing JSON: ${error.message}`;
    }

    if (result && objectName in result) {
        const obj = result[objectName];
        return { x: obj.x, z: obj.y} ;
    } else {
        return `Object '${objectName}' not found`;
    }
}

export const Experience = () => {

    const [simulationData, setSimulationData] = useState({});
    const ball = useRef();
    const player = useRef();

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

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-10, 10, 0]} intensity={0.4} />
            <OrbitControls />

            <Box position={[0, 0, 0]} args={[30, 1, 20]}>
                <meshStandardMaterial color="springgreen" />
            </Box>

            <Sphere
            ref={player}
            position={[0,1,0]}
            args={[0.3]}
            >
                <meshStandardMaterial color="red" />
            </Sphere>

            <Sphere
            ref={ball}
            position={[0,1,0]}
            args={[0.3]}
            >
                <meshStandardMaterial color="white" />
            </Sphere>
        </>
    );
};