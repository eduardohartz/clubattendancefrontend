import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import Handler from "./handler";
import "./assets/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Handler />
    </BrowserRouter>
  </StrictMode>
)