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
  const inputRefs = useRef(new Array(scenarios.length));
  const listRef = useRef(null);

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
    onScenarioSelect(index);
    setShowEditIcon(false); // Reset edit icon visibility
  };

  const handleToggleEditIcon = (e, index) => {
    e.stopPropagation(); // Prevent click from bubbling to the li element
    const isCurrentlyShown = selectedScenarioIndex === index && showEditIcon;
    setShowEditIcon(!isCurrentlyShown);

    if (!isCurrentlyShown) {
      setSelectedScenarioIndex(index);
    } else {
      setSelectedScenarioIndex(null);
    }
  };

  const updateScenario = (index, newName) => {
    const updatedScenarios = scenarios.map((scenario, sIndex) =>
      sIndex === index ? { ...scenario, name: newName } : scenario
    );
    dispatch(updateScenarioObjects({ scenarioIndex: index, objects: updatedScenarios[index].objects }));
  };

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowEditIcon(false);
      // Do not reset the selected scenario index here
      // setSelectedScenarioIndex(null);
    }
  };

  useEffect(() => {
    // Attach the listener to the window on mount
    window.addEventListener("mousedown", handleClickOutside);
    // Remove the listener on cleanup
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="scenario-list" ref={listRef}>
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
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                value={scenario.name}
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
