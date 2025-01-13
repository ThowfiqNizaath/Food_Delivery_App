import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Fallback from "./components/FallbackUI/Fallback.jsx";
const AppComponent = React.lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={2}
    autoHideDuration={2000}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <Suspense fallback={<Fallback />}>
      <Router>
        <AppComponent />
      </Router>
    </Suspense>
  </SnackbarProvider>
);
