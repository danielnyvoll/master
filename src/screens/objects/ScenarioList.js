import React, { useState, useEffect, useRef } from 'react';
import './ScenarioListStyle.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentScenarioIndex, addScenario, updateScenarioObjects } from "../../store"; // Adjust the import path as necessary

const ScenarioList = ({ onScenarioSelect }) => {
  const dispatch = useDispatch();
  const scenarios = useSelector((state) => state.scenarios.list);
  const [newScenario, setNewScenario] = useState('');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = scenarios.map((_, i) => inputRefs.current[i] ?? React.createRef());
  }, [scenarios]);

  const handleNewScenarioChange = (event) => {
    setNewScenario(event.target.value);
  };

  const handleAddScenario = () => {
    if (newScenario.trim() !== '') {
      dispatch(addScenario(newScenario));
      setNewScenario('');
    }
  };

  const handleSelectScenario = (index) => {
    dispatch(setCurrentScenarioIndex(index));
    onScenarioSelect(index); // This callback is used to inform ScenarioScreen
    setSelectedScenarioIndex(null); // Reset editing state
    setShowEditIcon(false); // Hide edit icon
  };

  const handleToggleEditIcon = (e, index) => {
    e.stopPropagation(); // Prevent li click event from firing
    setShowEditIcon(selectedScenarioIndex !== index || !showEditIcon);
    setSelectedScenarioIndex(index);
  };

  const updateScenario = (index, newName) => {
    const updatedScenarios = scenarios.map((scenario, sIndex) => 
      sIndex === index ? { ...scenario, name: newName } : scenario
    );
    dispatch(updateScenarioObjects({scenarioIndex: index, objects: updatedScenarios[index].objects}));
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
                value={selectedScenarioIndex === index ? scenario.name : scenario.name}
                onChange={(e) => updateScenario(index, e.target.value)}
                readOnly={selectedScenarioIndex !== index || !showEditIcon}
                style={{ cursor: selectedScenarioIndex === index && showEditIcon ? 'text' : 'default' }}
              />
              <span
                className="edit-icon"
                onClick={(e) => handleToggleEditIcon(e, index)}
                style={{ visibility: selectedScenarioIndex === index ? 'visible' : 'hidden' }}
              >✏️</span>
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
