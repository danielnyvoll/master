import React, { useState } from "react";
import Soccer from "../Soccer";
import "./TrainingScreen.css";

function TrainingScreen() {

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  }

  return (
    <div className="training-screen">
      <div className="left-container">
        <div className="component-container" style={{ width: "95%", height: "95%" }}>

        </div>
      </div>
      <div className="right-container">
        <div className="component-container" style={{ width: "95%", height: "45%" }}>
          <div className={isFullScreen ? "full-screen" : "game-container"}>
            <button onClick={toggleFullScreen}>
              {isFullScreen ? "Exit Full Screen" : "Full Screen"}
            </button>
            <Soccer />
          </div>
        </div>
        <div className="component-container" style={{ width: "95%", height: "45%" }}>

        </div>
      </div>
    </div>
  );
}

export default TrainingScreen;