import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';

const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        animation: 'spin 1s linear infinite'
      }}>
        ⏳
      </div>
      <p style={{ color: '#6c757d', margin: 0 }}>Loading application...</p>
    </div>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<LoadingScreen />} 
        persistor={persistor}
        onBeforeLift={() => {
          // Optional: Do something before rehydration
          console.log('Rehydrating state from storage...');
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;