import React, { useState } from 'react';
import infoIcon from '../../resources/Info.png'; 
import './FormStyle.css'; 
import { useDispatch, useSelector } from 'react-redux';

import { setModel } from '../../store';

function Form() {
  const dispatch = useDispatch();
  // State hooks to store the values of the inputs
  const [episodes, setEpisodes] = useState('');
  const [goalScores, setGoalScores] = useState('');
  const [runTime, setRunTime] = useState('');
  const [showInfoText, setShowInfoText] = useState(false);
  const model = useSelector(state => state.model);
  
  // Handlers to update the state values
  const handleEpisodesChange = (e) => setEpisodes(e.target.value);
  const handleGoalScoresChange = (e) => setGoalScores(e.target.value);
  const handleRunTimeChange = (e) => setRunTime(e.target.value);
  const handleModelChange = (e) => dispatch(setModel(e.target.value));

  const handleInfoClick = () => {
    setShowInfoText(!showInfoText);
  };

  return (
    <div>
      <div className="input-container">
        <label htmlFor="episodes">Episodes:</label>
        <input
          type="number"
          id="episodes"
          name="episodes"
          value={episodes}
          onChange={handleEpisodesChange}
          placeholder="3"
        />
      </div>

      <div className="input-container">
        <label htmlFor="goal-scores">Goal scores:</label>
        <input
          type="text"
          id="goal-scores"
          name="goal_scores"
          value={goalScores}
          onChange={handleGoalScoresChange}
          placeholder="Enter score"
        />
      </div>

      <div className="input-container">
        <label htmlFor="run-time">Run for time:</label>
        <input
          type="number"
          id="run-time"
          name="run_time"
          value={runTime}
          onChange={handleRunTimeChange}
          placeholder="Enter time"
        />
      </div>

      <div className="input-container">
        <label>Pick Model: 
          <img 
            src={infoIcon} 
            alt="Info" 
            className="info-icon" 
            onClick={handleInfoClick} // Toggle the info text on click
          />
          {showInfoText && (
            <span className="info-text">Q-learning helps the agent learn the basics and improve through trial and error. <br></br><br></br>While Deep Q-learning gives them the ability to learn and execute complex strategies, making them possible superstar soccer players!</span>
          )}
        </label>
        
        <div className="model-selection">
          <div className="model-option">
            <input
              type="radio"
              id="q-learning"
              name="model"
              value="q-learning"
              checked={model === 'q-learning'}
              onChange={handleModelChange}
              className="hidden-radio"
            />
            <label htmlFor="q-learning" className="model-label">
              Q-learning
              {model === 'q-learning' && <span className="checkmark">✔</span>}
            </label>
          </div>

          <div className="model-option">
            <input
              type="radio"
              id="q-deep-learning"
              name="model"
              value="q-deep-learning"
              checked={model === 'q-deep-learning'}
              onChange={handleModelChange}
              className="hidden-radio"
            />
            <label htmlFor="q-deep-learning" className="model-label">
              Q-deep learning
              {model === 'q-deep-learning' && <span className="checkmark">✔</span>}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;