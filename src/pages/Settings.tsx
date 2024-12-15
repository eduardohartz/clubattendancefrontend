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
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[40%] bg-greyscale-100 rounded-lg h-[300px] p-8">
                    <div className="mx-auto flex w-[100%] flex-col gap-8 mb-5 items-left">
                        <span className="text-3xl font-bold ml-2 self-center">User Settings</span>
                        <div className="flex flex-col w-full gap-2">
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
                                className="bg-accent-100 hover:bg-accent-200 transition-colors px-[20px] py-[10px] rounded-lg text-[15.5px] mr-2 justify-end w-full"
                                onClick={() => setShowModal(true)}
                            >
                                <FontAwesomeIcon icon={faKey} size="lg" />
                                {" "}
                                Change Password
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 transition-colors px-[20px] py-[10px] rounded-lg text-[15.5px] mr-2 justify-end w-full"
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
                    className="border mt-1 p-2 w-full mb-10 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                <label className="text-lg">New password</label>
                <input
                    type="password"
                    className="border mt-1 p-2 w-full mb-4 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <label className="text-lg">Repeat new password</label>
                <input
                    type="password"
                    className="border p-2 w-full mb-4 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                    value={repeatNewPassword}
                    onChange={e => setRepeatNewPassword(e.target.value)}
                    required
                />
            </Modal>

        </>
    )
}

export default Settings
