import "./TrainingScreen.css";
import "./Screen.css";
import Soccer from "../Soccer";
import Form from "./objects/Form";
import LiveLineGraph from "./objects/Graph";

function TraininingScreen() {
    return (
      <div>
      <div className="training-screen">
        <div className="left-container">
          <div className="info-container">
            <div className="info-component">
                <Form></Form>
            <div class="button-container">
            <button class="button red">Cancel</button>
            <button class="button green">Go</button>
            </div>
            </div>
          </div>
        </div>
        <div className="right-container">
  
          
            <div className="bottom-right-container">
            <LiveLineGraph></LiveLineGraph>
            <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>Goals</td>
            <td>Total Goals scored through x number of episodes</td>
            <td>120</td>
          </tr>
          <tr>
            <td>Reward</td>
            <td>Maximum reward gained on one singel episode</td>
            <td>690</td>
          </tr>
      </tbody>
    </table>
          </div>
        </div>
      </div>

      <div className="game-container">
          <Soccer />
      </div>
      </div>
    );
  }
  
  export default TraininingScreen;