import React from 'react';
import "./TrainingScreen.css"; // Make sure this path is correct
import Soccer from "../Soccer";
import LiveLineGraph from "./objects/Graph"; // Ensure this import path matches your project structure
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setModel, setStart } from '../store'; // Adjust according to your actual file structure

function TrainingScreen() {
    const dispatch = useDispatch();
    const reset = useSelector((state) => state.reset); 
    const model = useSelector(state => state.model);
    

    // Model selection handler
    const handleModelChange = (e) => dispatch(setModel(e.target.value));
const handleStartModel = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/start', { model }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.message);
        dispatch(setStart(true)); // Only dispatch on successful response
    } catch (error) {
        console.error('Error starting model:', error);
    }
};

    const handleStopModel = async () => {
        try {
            dispatch(setStart(false));
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
                        <h3 className="model-selection-heading">Choose one model and start training:</h3>
                            <div className="model-selection">
                                <label htmlFor="q-learning" className="model-label">
                                    <input
                                        type="radio"
                                        id="q-learning"
                                        name="model"
                                        value="q-learning"
                                        checked={model === 'q-learning'}
                                        onChange={handleModelChange}
                                        className="hidden-radio"
                                    />
                                    Q-learning
                                    {model === 'q-learning' && <span className="checkmark">✔</span>}
                                </label>
                                <label htmlFor="q-deep-learning" className="model-label">
                                    <input
                                        type="radio"
                                        id="q-deep-learning"
                                        name="model"
                                        value="q-deep-learning"
                                        checked={model === 'q-deep-learning'}
                                        onChange={handleModelChange}
                                        className="hidden-radio"
                                    />
                                    Q-deep learning
                                    {model === 'q-deep-learning' && <span className="checkmark">✔</span>}
                                </label>
                            </div>
                            <div className="button-container">
                                <button className="button red" onClick={handleStopModel}>Stop</button>
                                <button className="button green" onClick={handleStartModel}>Go</button>
                            </div>
                            <LiveLineGraph></LiveLineGraph>
                        </div>
                    </div>
                </div>
            </div>
            <div className="game-container">
                <Soccer key={reset} />
            </div>
        </div>
    );
}

export default TrainingScreen;
