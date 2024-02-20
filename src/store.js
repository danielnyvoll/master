import { configureStore, createSlice } from '@reduxjs/toolkit';

const commandSlice = createSlice({
  name: 'command',
  initialState: '',
  reducers: {
    setCommand: (state, action) => action.payload,
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
  },
});


// Export actions
export const { setGoal } = goalSlice.actions;
export const { setCommand } = commandSlice.actions;
export const { setPlayerPosition } = playerPositionSlice.actions;
export const { setBallPosition } = ballPositionSlice.actions;
