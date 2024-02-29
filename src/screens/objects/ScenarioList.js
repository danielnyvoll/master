import React, { useState, useEffect, useRef } from 'react';
import './ScenarioListStyle.css'; // Make sure this CSS file contains your styles

const ScenarioList = () => {
  const [scenarios, setScenarios] = useState([
    'Match',
    'Basic Shot',
    'Basic Dribbling',
    'Basic Pass',
    'Custom Scenario 1',
  ]);
  const [newScenario, setNewScenario] = useState('');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRefs = useRef(scenarios.map(() => React.createRef()));

  useEffect(() => {
    inputRefs.current = scenarios.map((_, i) => inputRefs.current[i] ?? React.createRef());
  }, [scenarios]);

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

  const handleSelectScenario = (index) => {
    setSelectedScenarioIndex(index);
    setShowEditIcon(false); // Reset edit icon visibility
  };

  const handleToggleEditIcon = (e, index) => {
    e.stopPropagation(); // Prevent click from bubbling to the li element
    const isCurrentlyShown = selectedScenarioIndex === index && showEditIcon;
    setShowEditIcon(!isCurrentlyShown);

    if (!isCurrentlyShown) {
      // Focus on the input field and make it editable
      setSelectedScenarioIndex(index);
      setTimeout(() => inputRefs.current[index].current.focus(), 0);
    } else {
      setSelectedScenarioIndex(null);
    }
  };

  return (
    <div className="scenario-list">
      <label>Select scenario:</label>
      <ul>
        {scenarios.map((scenario, index) => (
          <li
            key={index}
            className={selectedScenarioIndex === index ? "selected" : ""}
            onClick={() => handleSelectScenario(index)}
          >
            <div className="input-wrapper">
              <input
                ref={inputRefs.current[index]}
                type="text"
                value={scenario}
                onChange={(e) => updateScenario(index, e.target.value)}
                readOnly={selectedScenarioIndex !== index || !showEditIcon}
                style={{ cursor: selectedScenarioIndex === index && showEditIcon ? 'text' : 'default' }}
              />
              {selectedScenarioIndex === index && (
                <span
                  className="edit-icon"
                  onClick={(e) => handleToggleEditIcon(e, index)}
                >✏️</span>
              )}
            </div>
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
