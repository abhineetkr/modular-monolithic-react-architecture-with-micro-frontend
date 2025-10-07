import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout as logoutAction, updateUser } from '../store/slices/authSlice';
import { setCurrentModule } from '../store/slices/appSlice';
import { persistor } from '../store/store';

export const useAppState = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);

  // Login function
  const login = (userData) => {
    dispatch(loginSuccess(userData));
    dispatch(setCurrentModule('dashboard'));
  };

  // Logout function with persist purge
  const logout = async () => {
    try {
      // 1. Clear Redux state
      dispatch(logoutAction());
      dispatch(setCurrentModule('auth'));
      
      // 2. Purge persisted state from storage
      await persistor.purge();
      
      // 3. Optional: Clear any other storage
      // localStorage.removeItem('user-preferences');
      // sessionStorage.clear();
      
      console.log('Logout successful - all data cleared');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Hard logout - completely resets everything
  // const hardLogout = async () => {
  //   try {
  //     // Purge all persisted state
  //     await persistor.purge();
      
  //     // Clear all storage
  //     localStorage.clear();
  //     sessionStorage.clear();
      
  //     // Reload the page to reset app completely
  //     window.location.href = '/';
  //   } catch (error) {
  //     console.error('Hard logout error:', error);
  //     // Force reload anyway
  //     window.location.href = '/';
  //   }
  // };

  // Update user data
  const updateUserData = (userData) => {
    dispatch(updateUser(userData));
  };

  // Change module/page
  const changeModule = (module) => {
    dispatch(setCurrentModule(module));
  };

  return {
    // State
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    currentModule: app.currentModule,
    
    // Actions
    login,
    logout,
    //hardLogout,
    updateUser: updateUserData,
    setCurrentModule: changeModule
  };
};