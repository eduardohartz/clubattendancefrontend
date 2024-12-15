import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Handler from "./handler"
import { AuthProvider } from "./utils/AuthContext"
import ErrorBoundary from "./utils/ErrorBoundary"
import "./assets/styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <ToastContainer />
                <AuthProvider>
                    <Handler />
                </AuthProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>,
)
