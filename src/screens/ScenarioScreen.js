import React, { useState, useEffect, useRef } from "react";
import "./Screen.css";
import "./ScenarioScreen.css";
import Field from "../components/Field";
import { Canvas } from '@react-three/fiber';
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import ScenarioList from "./objects/ScenarioList";
import PlayerIcon from "../resources/player.png";
import BallIcon from "../resources/ball.png";
import ConeIcon from "../resources/cone.png";
import { Graph, useNode } from "graphire";
import useDragSnap from "../utils/useDrag";
import * as THREE from 'three';
import infoIcon from '../resources/Info.png'; 
import { useDispatch, useSelector } from 'react-redux';
import { updateObjectPosition, setCurrentScenarioIndex, updateScenarioObjects } from '../store';

function ScenarioScreen() {
  const dispatch = useDispatch();
  const currentScenarioIndex = useSelector(state => state.scenarios.currentScenarioIndex);
  const scenarios = useSelector(state => state.scenarios.list);
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => setShowInfo(!showInfo);

  const handleScenarioSelection = (index) => {
    dispatch(setCurrentScenarioIndex(index));
  };
  const addObject = (type) => {
    const newPosition = [Math.random() * 5, 0.5, 0];
    const attributes = {
      Player: { color: "#EF5B5B", id: Date.now() },
      Ball: { color: "white", id: Date.now() },
      Cone: { color: "black", id: Date.now() },
    };

    if (attributes[type]) {
      const { color, id } = attributes[type];
      const newObject = { type, id, position: newPosition, color };

      const updatedObjects = [...scenarios[currentScenarioIndex].objects, newObject];
      dispatch(updateScenarioObjects({ scenarioIndex: currentScenarioIndex, objects: updatedObjects }));
    }
  };
  const objects = scenarios[currentScenarioIndex]?.objects || [];


  return (
    <div className="training-screen">
      <div className="left-container">
        <div className="select-container">
            <ScenarioList onScenarioSelect={handleScenarioSelection}></ScenarioList>
        </div>
        <div className="title"> <span className="title-text">Set Up Your Own Scenario With These Objects:</span>
        <img 
    src={infoIcon} 
    alt="Info" 
    className="info-icon" 
    onClick={handleInfoClick} 
/>

            {showInfo && (
  <div className="info-box">
    <p><strong>Color Guide:</strong></p>
    <p><span style={{color: "#EF5B5B"}}>Red</span> - Player</p>
    <p><span style={{color: "white"}}>White</span> - Ball</p>
    <p><span style={{color: "black"}}>Black</span> - Cone</p>
  </div>
)}

            <div className="bottom-left-container-objects">
              
            <img src={PlayerIcon} alt="Add Player" onClick={() => addObject('Player')} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
            <img src={ConeIcon} alt="Add Cone" onClick={() => addObject('Cone')} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
            <img src={BallIcon} alt="Add Ball" onClick={() => addObject('Ball')} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
            </div> </div>
      </div>
      <div className="right-container">

        <div className="component-container">
          <div className="game-container">
          <Canvas style={{ width: '50vw', height: '60vh'}}>
          <ambientLight intensity={0.5} />
          <OrbitControls makeDefault enableDamping={false} />
            <Physics>
              <Field></Field>
              <Graph dim={3}>
              {objects.map((object, index) => (
    <Node
        key={index}
        uid={object.id}
        x={object.position[0]}
        y={object.position[1]}
        z={object.position[2]}
        color={object.color}
    />
))}
              </Graph>

            </Physics>
            
            </Canvas>
          </div>
          </div>   
      </div>
    </div>
  );
}

export default ScenarioScreen;


const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0) 

const Node = ({ uid, x, y, z, color }) => {
  // Initialize the ref at the top before any usage
  const ref = useRef();
  const dispatch = useDispatch();
  const currentScenarioIndex = useSelector(state => state.scenarios.currentScenarioIndex);

  // Use useNode to interact with the 3D object
  useNode((pos) => {
    if (ref.current) {
      ref.current.position.fromArray(pos);
    }
  }, { uid, x, y });

  // Define the plane for useDragSnap, assuming you want to restrict movement to a plane
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  // Setup drag and drop logic
  const bind = useDragSnap(([newX, newY, newZ], event) => {
    // Assuming y should be constrained or adjusted based on your requirements
    newY = 0;
    if (ref.current) {
      ref.current.position.set(newX, newY, newZ);
    }
    dispatch(updateObjectPosition({
      scenarioIndex: currentScenarioIndex,
      objectId: uid,
      newPosition: [newX, newY, newZ]
    }));
  }, plane);

  // useEffect to update the position when x, y, or z props change
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(x, y, z);
    }
  }, [x, y, z]);

  return (
    <mesh ref={ref} {...bind()} rotation={[0, Math.PI / 2, 0]} castShadow>
      <cylinderGeometry args={[1, 1, 0.2, 40]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};