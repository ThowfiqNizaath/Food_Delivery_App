import {Suspense } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './Context/StoreProvider.jsx'
import Fallback from './components/FallbackUI/Fallback.jsx'
const AppComponent = React.lazy(() => import("./App.jsx"));
import {SnackbarProvider} from "notistack";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<Fallback />}>
      <StoreContextProvider>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <AppComponent />
        </SnackbarProvider>
      </StoreContextProvider>
    </Suspense>
  </BrowserRouter>
);
