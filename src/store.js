import { configureStore, createSlice } from '@reduxjs/toolkit';


const scenariosSlice = createSlice({
  name: 'scenarios',
  initialState: {
    currentScenarioIndex: 0,
    list: [
      { name: 'Match', objects: [] },
      { name: 'Basic Shot', objects: [] },

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
    },
    incrementScenarioIndex: (state) => {
      const nextIndex = state.currentScenarioIndex + 1;
      // Ensure we don't exceed the list's bounds
      if (nextIndex < state.list.length) {
        state.currentScenarioIndex = nextIndex;
      }
    },
  },
});

const modelSlice = createSlice({
  name: 'model',
  initialState: 'q-learning',
  reducers: {
    setModel: (state, action) => action.payload,
  },
});

const commandOppositePlayerSlice = createSlice({
  name: 'commandOppositePlayer',
  initialState: '',
  reducers: {
    setOppositeCommand: (state, action) => action.payload,
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
const rewardSlice = createSlice({
  name: 'reward',
  initialState: 0,
  reducers:{
    setReward: (state, action) => action.payload,
  }
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

const multiplayerSlice = createSlice({
  name: 'multiplayer',
  initialState: { multiplayer: false },
  reducers: {
      setMultiplayer: (state, action) => {
          state.multiplayer = action.payload;
      }
  }
});

const startSlice = createSlice({
  name: 'start',
  initialState: false, // Directly using a boolean value for the initial state
  reducers: {
    setStart: (state, action) => action.payload, // Payload directly updates the state
  }
});

const nextSlice = createSlice({
  name: 'next',
  initialState: false, // Directly using a boolean value for the initial state
  reducers: {
    setNext: (state, action) => action.payload, // Payload directly updates the state
  }
});

const oppositePlayerPositionSlice = createSlice({
  name: 'oppositePlayerPosition',
  initialState: { x: 0, y: 0, z: 0 },
  reducers: {
    setOppositePlayerPosition: (state, action) => action.payload,
  },
});
// Configure the store
export const store = configureStore({
  reducer: {
    command: commandSlice.reducer,
    commandOppositePlayer: commandOppositePlayerSlice.reducer,
    playerPosition: playerPositionSlice.reducer,
    oppositePlayerPosition: oppositePlayerPositionSlice.reducer,
    ballPosition: ballPositionSlice.reducer,
    goal: goalSlice.reducer,
    reset: resetSlice.reducer,
    scenarios: scenariosSlice.reducer,
    model : modelSlice.reducer,
    reward : rewardSlice.reducer,
    start: startSlice.reducer,
    next: nextSlice.reducer,
    multiplayer : multiplayerSlice.reducer,
  },
});


// Export actions
export const { setMultiplayer } = multiplayerSlice.actions;
export const { setOppositeCommand } = commandOppositePlayerSlice.actions;
export const { setOppositePlayerPosition } = oppositePlayerPositionSlice.actions;
export const { setNext } = nextSlice.actions;
export const { setStart } = startSlice.actions;
export const { setGoal } = goalSlice.actions;
export const { setCommand } = commandSlice.actions;
export const { setPlayerPosition } = playerPositionSlice.actions;
export const { setBallPosition } = ballPositionSlice.actions;
export const { setReset } = resetSlice.actions;
export const { setCurrentScenarioIndex, updateScenarioObjects, addScenario, updateObjectPosition, incrementScenarioIndex } = scenariosSlice.actions;
export const { setModel } = modelSlice.actions;
export const { setReward } = rewardSlice.actions;