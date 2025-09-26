import store from '../store/store';
import { loginSuccess } from '../store/slices/authSlice';
import { setCurrentModule } from '../store/slices/appSlice';

export const hydrateStoreFromSession = () => {
  try {
    const savedState = sessionStorage.getItem('reduxState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Hydrate auth state
      if (parsedState.auth?.user) {
        store.dispatch(loginSuccess(parsedState.auth.user));
      }
      
      // Hydrate app state
      if (parsedState.app?.currentModule) {
        store.dispatch(setCurrentModule(parsedState.app.currentModule));
      }
    }
  } catch (error) {
    console.warn('Failed to hydrate state from session storage:', error);
  }
};