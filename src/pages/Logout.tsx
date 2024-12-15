import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DeleteSession from "../services/DeleteSession"
import { useAuth } from "../utils/AuthContext"

function Logout() {
    const navigate = useNavigate()
    const { setUser, setClub } = useAuth()

    useEffect(() => {
        const performLogout = async () => {
            const logout = await DeleteSession()

            if (logout) {
                Cookies.remove("session")
                setUser(null)
                setClub(null)
            }
            navigate("/")
        }

        performLogout()
    }, [navigate, setClub, setUser])

    return (
        <div>
        </div>
    )
}

export default Logout
