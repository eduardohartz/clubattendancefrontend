import type { JSX } from "react"
import type { Club, User } from "../types/models"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading" // Assuming you have a Loading component
import PageText from "./PageText"

function ProtectedRoute({ path, element, user, club }: { path: string, element: JSX.Element, user: User | null, club: Club | null }) {
    const navigate = useNavigate()
    const [shouldRender, setShouldRender] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            navigate(`/login?redirect=${path}`)
            setShouldRender(false)
        } else if (!club && path !== "/settings" && path !== "/dashboard/admin") {
            navigate(`/login?redirect=${path}`)
            setShouldRender(false)
        } else if (user.status === false) {
            setError("Your account has been disabled. Please contact an administrator.")
            setShouldRender(false)
        } else if (path.includes("admin") && !user.admin) {
            setError("You do not have permission to access this page.")
            setShouldRender(false)
        } else if (path !== "/settings" && path !== "/dashboard/admin" && club && club.status === false) {
            setError("Your club has been disabled. Please contact an administrator.")
            setShouldRender(false)
        } else {
            setShouldRender(true)
        }
        setIsLoading(false)
    }, [user, club, path, navigate])

    if (isLoading)
        return <Loading />

    if (error)
        return <PageText text={error} sidebar={true} />

    if (shouldRender)
        return element
    else
        return null
}

export default ProtectedRoute
