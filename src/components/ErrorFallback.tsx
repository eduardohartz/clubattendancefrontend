import { useNavigate } from "react-router-dom"

function ErrorFallback({ error }: { error: Error | null }) {
    const navigate = useNavigate()

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                <pre className="text-red-500 mb-4">{error?.message}</pre>
                <button
                    className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                    onClick={() => navigate("/")}
                >
                    Return Home
                </button>
            </div>
        </div>
    )
}

export default ErrorFallback
