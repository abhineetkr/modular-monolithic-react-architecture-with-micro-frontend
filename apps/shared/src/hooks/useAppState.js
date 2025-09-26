import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout, updateUser } from '../store/slices/authSlice';
import { setCurrentModule } from '../store/slices/appSlice';

export const useAppState = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);

  const login = (userData) => {
    dispatch(loginSuccess(userData));
    dispatch(setCurrentModule('dashboard'));
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(setCurrentModule('auth'));
    sessionStorage.removeItem('reduxState');
  };

  const updateUserData = (userData) => {
    dispatch(updateUser(userData));
  };

  const changeModule = (module) => {
    dispatch(setCurrentModule(module));
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    currentModule: app.currentModule,
    login,
    logout: logoutUser,
    updateUser: updateUserData,
    setCurrentModule: changeModule,
  };
};