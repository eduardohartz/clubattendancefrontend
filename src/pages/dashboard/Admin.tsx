import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import Cookies from "js-cookie"
import { useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Table from "../../components/Table"
import getBaseUrl from "../../services/Api"
import { useAuth } from "../../utils/AuthContext"

function Admin() {

    const { user } = useAuth()

    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!user)
        return

    const handleAddUser = async () => {
        const username = prompt("Enter the username for the new user:")

        if (!username) {
            return
        }

        setIsSubmitting(true)

        try {
            const token = Cookies.get("session")
            const response = await axios.post(`${getBaseUrl()}/admin/users/create`, {
                username,
            }, {
                headers: {
                    Authorization: `${token}`,
                },
            })

            if (response.data.success) {
                alert("User created successfully")
                window.location.reload()
            } else {
                alert("Failed to create user")
            }
        } catch {
            alert("An error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Admin | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="relative top-[100px] w-[996px] max-w-[90%] 2xl:w-[1400px]">
                    <div className="mx-auto mb-5 flex w-full items-center justify-between">
                        <span className="ml-2 justify-start text-2xl font-bold">Users</span>
                        <button
                            className="mr-2 justify-end rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-accent-200"
                            onClick={handleAddUser}
                            disabled={isSubmitting}
                        >
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                            {" "}
                            Add User
                        </button>
                    </div>
                    <Table type="users" />
                </div>
                <div className="relative top-[100px] w-[996px] max-w-[90%] 2xl:w-[1400px]">
                    <div className="mx-auto mb-5 flex w-full items-center justify-between">
                        <span className="ml-2 justify-start text-2xl font-bold">Clubs</span>
                    </div>
                    <Table type="clubs" />
                </div>
            </div>
        </>
    )
}

export default Admin
