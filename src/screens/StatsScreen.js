import "./StatsScreen.css";
import "./Screen.css";
import LiveLineGraph from "./objects/Graph";

function StatsScreen() {
    return (
      <div className="training-screen">
        <div className="left-container">
          <div className="info-container">
            <div className="info-component">
  
            </div>
          </div>
        </div>
        <div className="right-container">
  
          <div className="component-container">
            <div className="game-container">
                <LiveLineGraph></LiveLineGraph>
            </div>
            </div>
            <div className="bottom-right-container">
            <h1>INFO</h1>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default StatsScreen;