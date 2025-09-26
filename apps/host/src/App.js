import React, { useEffect } from "react";
import { useAppState } from "../../shared/src/hooks/useAppState";
import { hydrateStoreFromSession } from "../../shared/src/utils/stateHydration";
import MicroFrontendLoader from "./components/MicroFrontendLoader";

// Lazy load micro frontends
const AuthApp = React.lazy(() => import("auth/AuthApp"));
const DashboardApp = React.lazy(() => import("dashboard/DashboardApp"));
const ProfileApp = React.lazy(() => import("../../profile/src/App"));

const HostApp = () => {
  const { isAuthenticated, currentModule } = useAppState();

  // Hydrate state on app initialization
  useEffect(() => {
    hydrateStoreFromSession();
  }, []);

  const renderCurrentModule = () => {
    if (!isAuthenticated) {
      return (
        <MicroFrontendLoader name="Auth Module">
          <AuthApp />
        </MicroFrontendLoader>
      );
    }

    switch (currentModule) {
      case 'dashboard':
        return (
          <MicroFrontendLoader name="Dashboard Module">
            <DashboardApp />
          </MicroFrontendLoader>
        );
      case 'profile':
        return (
          <MicroFrontendLoader name="Profile Module">
            <ProfileApp />
          </MicroFrontendLoader>
        );
      default:
        return (
          <MicroFrontendLoader name="Dashboard Module">
            <DashboardApp />
          </MicroFrontendLoader>
        );
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {renderCurrentModule()}
    </div>
  );
};

export default HostApp;