import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Menu from './screens/Menu';
import TrainingScreen from './screens/TrainingScreen';
import StatsScreen from './screens/StatsScreen';
import ScenarioScreen from './screens/ScenarioScreen';
import "./App.css";
function App() {
  return (
    <div className="app-container">
      <Menu />
      <div className="content-container">
        <Routes>
          <Route path="/training" element={<TrainingScreen />} />
          <Route path="/" element={<ScenarioScreen />} />
          <Route path="/stats" element={<StatsScreen />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
