import React from "react";
import Game from "../components/Game";
import "./Screen.css";

function TrainingScreen() {
  return (
    <div className="training-screen">
      <div className="left-container">
        <div className="component-container" style={{ width: "95%", height: "95%" }}>

        </div>
      </div>
      <div className="right-container">
        <div className="component-container" style={{ width: "95%", height: "45%" }}>
          <div className="game-container">
            <Game />
          </div>
        </div>
        <div className="component-container" style={{ width: "95%", height: "45%" }}>

        </div>
      </div>
    </div>
  );
}

export default TrainingScreen;
