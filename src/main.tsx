import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import Handler from "./handler";
import "./assets/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ToastContainer />
    <Handler />
  </BrowserRouter>
)