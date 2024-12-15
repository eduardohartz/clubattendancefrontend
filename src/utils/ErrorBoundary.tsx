import type { ErrorInfo, ReactNode } from "react"
import { Component } from "react"
import ErrorFallback from "../components/ErrorFallback"

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
        // TODO: Add error reporting service here
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error} />
        }

        return this.props.children
    }
}

export default ErrorBoundary
