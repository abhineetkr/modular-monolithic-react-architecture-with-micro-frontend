import React from "react";
import { createRoot } from "react-dom/client";
import { ReduxProvider } from "../../shared/src/index";
import HostApp from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ReduxProvider>
      <HostApp />
    </ReduxProvider>
  </React.StrictMode>
);