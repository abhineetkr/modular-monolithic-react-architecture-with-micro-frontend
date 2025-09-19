import React from "react";
import MicroFrontendLoader from "./components/MicroFrontendLoader";

// Lazy load micro frontends
const AuthApp = React.lazy(() => import("auth/AuthApp"));
const DashboardApp = React.lazy(() => import("dashboard/DashboardApp"));

const HostApp = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ 
        backgroundColor: '#343a40', 
        color: 'white', 
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>🏠 Host Application</h1>
        <p>Modular Monolithic Architecture with Micro Frontends</p>
      </header>
      
      <main style={{ padding: '20px' }}>
        <MicroFrontendLoader name="Auth Module">
          <AuthApp />
        </MicroFrontendLoader>
        
        <MicroFrontendLoader name="Dashboard Module">
          <DashboardApp />
        </MicroFrontendLoader>
      </main>
      
      <footer style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p>© 2024 Micro Frontend Demo</p>
      </footer>
    </div>
  );
};

export default HostApp;