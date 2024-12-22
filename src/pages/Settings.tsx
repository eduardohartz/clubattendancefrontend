import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import { deleteUser } from "../services/DeleteData"
import { updatePassword } from "../services/UpdateData"
import { useAuth } from "../utils/AuthContext"

function Settings() {

    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")
    const navigate = useNavigate()

    if (!user)
        return null

    const handleCloseModal = () => {
        setShowModal(false)
        setCurrentPassword("")
        setNewPassword("")
        setRepeatNewPassword("")
    }

    const handleSubmit = () => {
        if (!currentPassword || !newPassword || !repeatNewPassword)
            return

        updatePassword(currentPassword, newPassword, repeatNewPassword)
        handleCloseModal()
    }

    const handleDeleteUser = async () => {
        const result = await deleteUser()
        if (result) {
            navigate("/")
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>User Settings | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="absolute top-[100px] h-[300px] w-[500px] max-w-[90%] rounded-lg bg-greyscale-100 p-8">
                    <div className="items-left mx-auto mb-5 flex w-full flex-col gap-8">
                        <span className="ml-2 self-center text-3xl font-bold">User Settings</span>
                        <div className="flex w-full flex-col gap-2">
                            <span className="text-xl">
                                User ID:
                                {" "}
                                {user.id}
                            </span>
                            <span className="text-xl">
                                Username:
                                {" "}
                                {user.username}
                            </span>
                            <button
                                className="mr-2 w-full justify-end rounded-lg bg-accent-100 px-[20px] py-[10px] text-[15.5px] transition-colors hover:bg-accent-200"
                                onClick={() => setShowModal(true)}
                            >
                                <FontAwesomeIcon icon={faKey} size="lg" />
                                {" "}
                                Change Password
                            </button>
                            <button
                                className="mr-2 w-full justify-end rounded-lg bg-red-400 px-[20px] py-[10px] text-[15.5px] transition-colors hover:bg-red-500"
                                onClick={() => handleDeleteUser}
                            >
                                <FontAwesomeIcon icon={faTrash} size="lg" />
                                {" "}
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                title="Change Password"
                submitText="Submit"
                closeText="Cancel"
            >
                <label className="text-lg">Current password</label>
                <input
                    type="password"
                    className="mb-10 mt-1 w-full rounded-lg border border-greyscale-200 bg-greyscale-100 p-2 transition-all focus:ring-accent-100"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                <label className="text-lg">New password</label>
                <input
                    type="password"
                    className="mb-4 mt-1 w-full rounded-lg border border-greyscale-200 bg-greyscale-100 p-2 transition-all focus:ring-accent-100"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <label className="text-lg">Repeat new password</label>
                <input
                    type="password"
                    className="mb-4 w-full rounded-lg border border-greyscale-200 bg-greyscale-100 p-2 transition-all focus:ring-accent-100"
                    value={repeatNewPassword}
                    onChange={e => setRepeatNewPassword(e.target.value)}
                    required
                />
            </Modal>

        </>
    )
}

export default Settings
