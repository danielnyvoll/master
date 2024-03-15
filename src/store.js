import { configureStore, createSlice } from '@reduxjs/toolkit';


const scenariosSlice = createSlice({
  name: 'scenarios',
  initialState: {
    currentScenarioIndex: 0,
    list: [
      { name: 'Match', objects: [] },
      { name: 'Basic Shot', objects: [] },
      // ... other scenarios
    ],
  },
  reducers: {
    setCurrentScenarioIndex: (state, action) => {
      state.currentScenarioIndex = action.payload;
    },
    updateScenarioObjects: (state, action) => {
      const { scenarioIndex, objects } = action.payload;
      state.list[scenarioIndex].objects = objects;
    },
    addScenario: (state, action) => {
      state.list.push({ name: action.payload, objects: [] });
    },
    updateObjectPosition: (state, action) => {
      const { scenarioIndex, objectId, newPosition } = action.payload;
      const scenario = state.list[scenarioIndex];
      const objectIndex = scenario.objects.findIndex(obj => obj.id === objectId);
      if (objectIndex !== -1) {
        scenario.objects[objectIndex].position = newPosition;
      }
    }
  },
});


const commandSlice = createSlice({
  name: 'command',
  initialState: '',
  reducers: {
    setCommand: (state, action) => action.payload,
  },
});

const resetSlice = createSlice({
  name: 'reset',
  initialState: false,
  reducers: {
    setReset: (state, action) => action.payload,
  },
});

// Player position slice
const playerPositionSlice = createSlice({
  name: 'playerPosition',
  initialState: { x: 0, y: 0, z: 0 },
  reducers: {
    setPlayerPosition: (state, action) => action.payload,
  },
});

// Ball position slice
const ballPositionSlice = createSlice({
  name: 'ballPosition',
  initialState: { x: 0, y: 5, z: 0 },
  reducers: {
    setBallPosition: (state, action) => action.payload,
  },
});

const goalSlice = createSlice({
    name: 'goal',
    initialState:{
        intersecting: false,
    },
    reducers: {
        setGoal: (state, action) => {
            state.intersecting = action.payload;
        }
    }
});

// Configure the store
export const store = configureStore({
  reducer: {
    command: commandSlice.reducer,
    playerPosition: playerPositionSlice.reducer,
    ballPosition: ballPositionSlice.reducer,
    goal: goalSlice.reducer,
    reset: resetSlice.reducer,
    scenarios: scenariosSlice.reducer,
  },
});


// Export actions
export const { setGoal } = goalSlice.actions;
export const { setCommand } = commandSlice.actions;
export const { setPlayerPosition } = playerPositionSlice.actions;
export const { setBallPosition } = ballPositionSlice.actions;
export const { setReset } = resetSlice.actions;
export const { setCurrentScenarioIndex, updateScenarioObjects, addScenario, updateObjectPosition } = scenariosSlice.actions;
