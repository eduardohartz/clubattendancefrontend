import { useNavigate } from "react-router-dom"

function ErrorFallback({ error }: { error: Error | null }) {
    const navigate = useNavigate()

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="text-center">
                <h1 className="mb-4 font-bold text-2xl">Something went wrong</h1>
                <pre className="mb-4 text-red-500">{error?.message}</pre>
                <button
                    className="justify-end bg-accent-100 hover:bg-accent-200 mr-2 px-[25px] py-[12px] rounded-lg text-[13.5px] transition-colors"
                    onClick={() => navigate("/")}
                >
                    Return Home
                </button>
            </div>
        </div>
    )
}

export default ErrorFallback
