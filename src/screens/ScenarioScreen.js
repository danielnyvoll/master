import React from "react";
import "./Screen.css";
import "./ScenarioScreen.css";
import Field from "../components/Field";
import { Canvas } from '@react-three/fiber';
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import ScenarioList from "./objects/ScenarioList";
import Scene from "./tools/DraggableItems";

function ScenarioScreen() {
  return (
    <div className="training-screen">
      <div className="left-container">
        <div className="select-container">
            <ScenarioList></ScenarioList>
        </div>
      </div>
      <div className="right-container">

        <div className="component-container">
          <div className="game-container">
          <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
            <Physics>
              <Field></Field>
            </Physics>
            
            </Canvas>
          </div>
          </div>
          <div className="bottom-right-container">
            <div className="title">Set Up Your Own Scenario With These Objects:</div>
            
            <div className="bottom-right-container-objects">
              
              <Scene></Scene>
            </div>       
        </div>
      </div>
    </div>
  );
}

export default ScenarioScreen;