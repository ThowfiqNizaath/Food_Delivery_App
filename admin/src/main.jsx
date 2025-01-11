import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import {SnackbarProvider} from 'notistack';

createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={2}>
    <Router>
      <App />
    </Router>
  </SnackbarProvider>
);
  