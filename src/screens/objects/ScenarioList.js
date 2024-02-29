import React, { useState } from 'react';
import './ScenarioListStyle.css'; // Make sure to create ScenarioList.css for styling

const ScenarioList = () => {
  const [scenarios, setScenarios] = useState([
    'Match',
    'Basic Shot',
    'Basic Dribbling',
    'Basic Pass',
    'Custom Scenario 1'
  ]);
  const [newScenario, setNewScenario] = useState('');

  const handleNewScenarioChange = (event) => {
    setNewScenario(event.target.value);
  };

  const handleAddScenario = () => {
    if (newScenario.trim() !== '') {
      setScenarios([...scenarios, newScenario]);
      setNewScenario('');
    }
  };

  const updateScenario = (index, value) => {
    const updatedScenarios = [...scenarios];
    updatedScenarios[index] = value;
    setScenarios(updatedScenarios);
  };

  return (
    <div className="scenario-list">
      <label>Select scenario:</label>
      <ul>
        {scenarios.map((scenario, index) => (
          <li key={index}>
            <input
              type="text"
              value={scenario}
              onChange={(e) => updateScenario(index, e.target.value)}
            />
          </li>
        ))}
        <li className="add-scenario">
          <input
            type="text"
            placeholder="Type new scenario..."
            value={newScenario}
            onChange={handleNewScenarioChange}
          />
          <button onClick={handleAddScenario}>+</button>
        </li>
      </ul>
    </div>
  );
};

export default ScenarioList;
