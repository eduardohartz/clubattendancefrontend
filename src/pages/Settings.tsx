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
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <div className="top-[100px] absolute bg-greyscale-100 p-8 rounded-lg w-[500px] max-w-[90%] h-[300px]">
                    <div className="flex flex-col items-left gap-8 mx-auto mb-5 w-full">
                        <span className="ml-2 font-bold text-3xl self-center">User Settings</span>
                        <div className="flex flex-col gap-2 w-full">
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
                                className="justify-end bg-accent-100 hover:bg-accent-200 mr-2 px-[20px] py-[10px] rounded-lg w-full text-[15.5px] transition-colors"
                                onClick={() => setShowModal(true)}
                            >
                                <FontAwesomeIcon icon={faKey} size="lg" />
                                {" "}
                                Change Password
                            </button>
                            <button
                                className="justify-end bg-red-400 hover:bg-red-500 mr-2 px-[20px] py-[10px] rounded-lg w-full text-[15.5px] transition-colors"
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
                    className="border-greyscale-200 bg-greyscale-100 mt-1 mb-10 p-2 border rounded-lg focus:ring-accent-100 w-full transition-all"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                <label className="text-lg">New password</label>
                <input
                    type="password"
                    className="border-greyscale-200 bg-greyscale-100 mt-1 mb-4 p-2 border rounded-lg focus:ring-accent-100 w-full transition-all"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <label className="text-lg">Repeat new password</label>
                <input
                    type="password"
                    className="border-greyscale-200 bg-greyscale-100 mb-4 p-2 border rounded-lg focus:ring-accent-100 w-full transition-all"
                    value={repeatNewPassword}
                    onChange={e => setRepeatNewPassword(e.target.value)}
                    required
                />
            </Modal>

        </>
    )
}

export default Settings
