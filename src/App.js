import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Menu from './screens/Menu';
import TrainingScreen from './screens/TrainingScreen';
import StatsScreen from './screens/StatsScreen';
import ScenarioScreen from './screens/ScenarioScreen';
import "./App.css";
import { Suspense } from 'react';
function App() {
  return (
    <Suspense fallback={<Loading/>}>
    <div className="app-container">
      <Menu />
      <div className="content-container">
        <Routes>
          <Route path="/training" element={<TrainingScreen />} />
          <Route path="" element={<ScenarioScreen />} />
          <Route path="/stats" element={<StatsScreen />} />
        </Routes>
      </div>
    </div></Suspense>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default App;
