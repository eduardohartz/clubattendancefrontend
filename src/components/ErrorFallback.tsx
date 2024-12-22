import { useNavigate } from "react-router-dom"

function ErrorFallback({ error }: { error: Error | null }) {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
                <pre className="mb-4 text-red-500">{error?.message}</pre>
                <button
                    className="mr-2 justify-end rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-accent-200"
                    onClick={() => navigate("/")}
                >
                    Return Home
                </button>
            </div>
        </div>
    )
}

export default ErrorFallback
