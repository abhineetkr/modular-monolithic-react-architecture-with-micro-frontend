import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModule: 'auth',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentModule: (state, action) => {
      state.currentModule = action.payload;
    },
  },
});

export const { setCurrentModule } = appSlice.actions;
export default appSlice.reducer;