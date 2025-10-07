import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // ✅ USE SESSION STORAGE
import { combineReducers } from 'redux';
import authSlice from './slices/authSlice';
import appSlice from './slices/appSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage, // This now uses sessionStorage
  whitelist: ['auth', 'app'], // Only persist these reducers
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

export default store;