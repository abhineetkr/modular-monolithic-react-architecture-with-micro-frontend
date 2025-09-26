import { createListenerMiddleware } from '@reduxjs/toolkit';

const persistMiddleware = createListenerMiddleware();

// Listen to all actions and persist to sessionStorage
persistMiddleware.startListening({
  predicate: () => true,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    
    // Save to sessionStorage for micro frontend communication
    const persistedState = {
      auth: state.auth,
      app: state.app,
    };
    
    sessionStorage.setItem('reduxState', JSON.stringify(persistedState));
  },
});

export default persistMiddleware;