import { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { updatePassword } from "../services/UpdateData";
import { deleteUser } from "../services/DeleteData";
import { useNavigate } from "react-router-dom";
import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../types/models";

function Settings({ user }: { user: User | null }) {
    if (!user) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const navigate = useNavigate();

    const handleOpenModal = (field: string) => {
        setFieldToEdit(field);
        setIsModalVisible(true);
        setTimeout(() => setIsModalOpen(true), 200)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setIsModalVisible(false), 300)
        setFieldToEdit("");
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
    };

    const handleSubmit = () => {
        if (fieldToEdit === "Change Password") {
            if (!currentPassword || !newPassword || !repeatNewPassword) {
                return;
            }
            updatePassword(currentPassword, newPassword, repeatNewPassword);
        }
        handleCloseModal();
    };

    const handleDeleteUser = async () => {
        const result = await deleteUser();
        if (result) {
            navigate("/")
        }
    };

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
                            <span className="text-xl">User ID: {user.id}</span>
                            <span className="text-xl">Username: {user.username}</span>
                            <button
                                className="bg-accent-100 hover:bg-accent-200 transition-colors px-[20px] py-[10px] rounded-lg text-[15.5px] mr-2 justify-end w-full"
                                onClick={() => handleOpenModal("Change Password")}
                            >
                                <FontAwesomeIcon icon={faKey} size="lg" /> Change Password
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 transition-colors px-[20px] py-[10px] rounded-lg text-[15.5px] mr-2 justify-end w-full"
                                onClick={() => handleDeleteUser}
                            >
                                <FontAwesomeIcon icon={faTrash} size="lg" />  Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`bg-white w-[500px] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isModalOpen ? "scale-100" : "scale-95"}`}
                    >
                        <h2 className="text-2xl font-bold mb-4">{fieldToEdit}</h2>
                        <label className="text-lg">Current password</label>
                        <input
                            type="password"
                            className="border mt-1 p-2 w-full mb-10 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <label className="text-lg">New password</label>
                        <input
                            type="password"
                            className="border mt-1 p-2 w-full mb-4 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <label className="text-lg">Repeat new password</label>
                        <input
                            type="password"
                            className="border p-2 w-full mb-4 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                            value={repeatNewPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                            required
                        />

                        <button
                            className="bg-accent-100 hover:bg-accent-200 text-white px-4 py-2 rounded-lg mr-2 transition-colors"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Settings;