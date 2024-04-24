import React, { useRef } from 'react';
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

    const fileInputRef = useRef(null); // Create a ref for the file input

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

    const handleUploadModel = async (event) => {
        const file = event.target.files[0];
        // Only proceed if the file name is valid
        if (file && (file.name === 'dqn_model_red.keras' || file.name === 'dqn_model.keras')) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data.message);
            } catch (error) {
                console.error('Error uploading model:', error.response?.data?.message || error);
            }
        } else {
            console.error('Invalid file name. Please upload either dqn_model_red.keras or dqn_model.keras.');
        }
    };
    
    const handleDownloadModel = async () => {
        const modelNames = ['dqn_model_red.keras', 'dqn_model.keras'];
    
        for (let modelName of modelNames) {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/download?model_name=${modelName}`, {
                    responseType: 'blob',
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', modelName);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url); // Clean up the URL object
                link.remove();
            } catch (error) {
                console.error(`Error downloading model ${modelName}:`, error.response?.data?.message || error);
            }
        }
    };

    return (
        <div>
            <div className="training-screen">
                <div className="left-container">
                    <div className="info-container">
                        <div className="info-component">
                       
                        <button className="button" onClick={() => fileInputRef.current.click()}>Upload Model</button>
                        <button className="button" onClick={() => handleDownloadModel('model_name.keras')}>Download Model</button> <input
                        type="file"
                        onChange={handleUploadModel}
                        style={{ display: 'none' }} // Hide the file input element
                        ref={fileInputRef} // Assign the ref to the file input
                    />
                        <h3 className="model-selection-heading">Choose Training or Match:</h3>
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
                                    Training
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
                                    Match
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