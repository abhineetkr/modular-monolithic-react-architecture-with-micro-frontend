import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import appSlice from './slices/appSlice';

// Simple persistence middleware
const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  
  // Save to sessionStorage for micro frontend communication
  const persistedState = {
    auth: state.auth,
    app: state.app,
  };
  
  sessionStorage.setItem('reduxState', JSON.stringify(persistedState));
  return result;
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(persistenceMiddleware),
});

export default store;