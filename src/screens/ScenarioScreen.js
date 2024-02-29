import React from "react";
import "./Screen.css";
import Field from "../components/Field";
import { Canvas } from '@react-three/fiber';
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import ScenarioList from "./objects/ScenarioList";


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
          <h1>INFO</h1>

        </div>
      </div>
    </div>
  );
}

export default ScenarioScreen;