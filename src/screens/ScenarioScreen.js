import React, { useState } from "react";
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


function ScenarioScreen() {
  const [showInfo, setShowInfo] = useState(false);
  const [objects, setObjects] = useState([]);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
};

  const addObject = (type) => {
    const newPosition = [Math.random() * 5, 0.5, 0];

    const attributes = {
        Player: { color: "#EF5B5B", id: 0 }, // Red color for Player
        Ball: { color: "white", id: 1 },     // White color for Ball
        Cone: { color: "black", id: 2 },     // Black color for Cone
    };

    if (attributes[type]) {
        const { color, id } = attributes[type];
        setObjects([...objects, { type, id, position: newPosition, color }]);
    } else {
        console.warn("Unknown type:", type);
    }
};


  return (
    <div className="training-screen">
      <div className="left-container">
        <div className="select-container">
            <ScenarioList></ScenarioList>
        </div>
        <div className="title">Set Up Your Own Scenario With These Objects:
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

const Node = (props) => {
  const { uid, x, y, color = "white" } = props;
  const ref = React.useRef();

  const api = useNode((pos) => {
    ref.current.position.fromArray(pos);
  }, { uid, x, y });

  const bind = useDragSnap(([x, y, z], e) => {
    if(y > 0 || y < 0){
      y = 0;
    }
    e.stopPropagation(); 
    api.set({ x, z });
}, plane);

  return (
    <mesh ref={ref} {...bind()} rotation={[0,Math.PI/2,0]} castShadow> 
      <cylinderGeometry args={[1,1,0.2, 40]}/>
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
};