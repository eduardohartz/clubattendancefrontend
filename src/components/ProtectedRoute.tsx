import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getClub, getUser } from "../services/Auth"
import { useAuth } from "../utils/AuthContext"
import Loading from "./Loading"
import PageText from "./PageText"
import PageTransition from "./PageTransition"

function ProtectedRoute({ path, children }: { path: string, children: ReactNode }) {
    const navigate = useNavigate()
    const { setUser, setClub, setIsLoading, isLoading, user } = useAuth()
    const [shouldRender, setShouldRender] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasFetched, setHasFetched] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched) return

            setIsLoading(true)
            setError(null)
            setShouldRender(false)

            try {
                if (!user) {
                    const userData = await getUser()
                    await setUser(userData)

                    if (!userData) {
                        navigate(`/login?redirect=${path}`)
                        return
                    }

                    if (userData.status === false) {
                        setError("Your account has been disabled. Please contact an administrator.")
                        return
                    }

                    if (path.includes("admin") && !userData.admin) {
                        setError("You do not have permission to access this page.")
                        return
                    }

                    const clubData = await getClub()
                    await setClub(clubData)

                    if (!clubData && path !== "/settings" && path !== "/dashboard/admin") {
                        navigate(`/login?redirect=${path}`)
                        return
                    }

                    if (path !== "/settings" && path !== "/dashboard/admin" && clubData?.status === false) {
                        setError("Your club has been disabled. Please contact an administrator.")
                        return
                    }
                }

                setHasFetched(true)
                setShouldRender(true)
            } catch {
                navigate(`/login?redirect=${path}`)
                return
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [navigate, setUser, setClub, hasFetched])

    if (isLoading)
        return <PageTransition key={"loading"}><Loading /></PageTransition>
    if (error)
        return <PageTransition key={"errorText"}><PageText text={error} sidebar={true} /></PageTransition>
    if (shouldRender)
        return children

    return null
}

export default ProtectedRoute