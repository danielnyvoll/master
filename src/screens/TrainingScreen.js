import "./TrainingScreen.css";
import "./Screen.css";
import Soccer from "../Soccer";
import Form from "./objects/Form";
import LiveLineGraph from "./objects/Graph";
import axios from 'axios';
import { useSelector } from 'react-redux';

function TraininingScreen() {
    const reset = useSelector((state) => state.reset); 
    const model = useSelector(state => state.model);
    console.log(model);
  const handleStartModel = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start', {
      model: model,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data.message);
    } catch (error) {
      console.error('Error starting model:', error);
    }
  };
  const handleStopModel = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/stop');
      console.log(response.data.message);
    } catch (error) {
      console.error('Error stopping model:', error);
    }
  };
  
    return (
      <div>
      <div className="training-screen">
        <div className="left-container">
          <div className="info-container">
            <div className="info-component">
                <Form></Form>
            <div class="button-container">
            <button className="button red" onClick={handleStopModel}>Stop</button>
            <button className="button green" onClick={handleStartModel}>Go</button>
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
          <Soccer key={reset} />
      </div>
      </div>
    );
  }
  
  export default TraininingScreen;