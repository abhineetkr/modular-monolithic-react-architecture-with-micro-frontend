import React from "react";
import { createRoot } from "react-dom/client";
import HostApp from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HostApp />
  </React.StrictMode>
);