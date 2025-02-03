import { faDownload, faPenToSquare, faQrcode, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Modal"
import { deleteClub } from "../../services/DeleteData"
import { updateAllowSelfRegistration, updateClubName, updateOfficerName, updateUseStaticCode } from "../../services/UpdateData"
import { useAuth } from "../../utils/AuthContext"

function Settings() {
    const { club } = useAuth()
    const [isQrChecked, setIsQrChecked] = useState(club ? club.useStaticCode : false)
    const [isSelfChecked, setIsSelfChecked] = useState(club ? club.allowSelfRegistration : false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showQrModal, setShowQrModal] = useState(false)
    const [fieldToEdit, setFieldToEdit] = useState("")
    const [newFieldValue, setNewFieldValue] = useState("")
    const qrCodeRef = useRef<HTMLImageElement>(null)
    const navigate = useNavigate()

    if (!club)
        return null

    const handleOpenEditModal = (field: string, currentValue: string) => {
        setFieldToEdit(field)
        setNewFieldValue(currentValue)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setFieldToEdit("")
        setNewFieldValue("")
    }

    const handleSubmit = () => {
        if (fieldToEdit === "Club Name") {
            updateClubName(newFieldValue)
            club.displayName = newFieldValue
        } else if (fieldToEdit === "Officer Name") {
            updateOfficerName(newFieldValue)
            club.officer = newFieldValue
        }
        handleCloseEditModal()
    }

    const handleQrCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setIsQrChecked(checked)
        await updateUseStaticCode(checked)
    }

    const handleSelfCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setIsSelfChecked(checked)
        await updateAllowSelfRegistration(checked)
    }

    const handleDeleteClub = async () => {
        const result = await deleteClub()
        if (result) {
            navigate("/")
        }
    }

    const handleDownloadQrCode = () => {
        if (qrCodeRef.current) {
            const link = document.createElement("a")
            link.href = qrCodeRef.current.src
            link.target = "_blank"
            link.download = "qr_code.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Club Settings | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <div className="top-[100px] absolute bg-greyscale-100 p-8 rounded-lg w-[500px] max-w-[90%] h-[365px]">
                    <div className="flex flex-col items-left gap-8 mx-auto mb-5 w-full">
                        <span className="ml-2 font-bold text-3xl self-center">Club Settings</span>
                        <div className="flex flex-col gap-2 w-full">
                            <span className="text-xl">
                                Club name:
                                {" "}
                                {club.displayName}
                                <FontAwesomeIcon icon={faPenToSquare} className="ml-1 hover:cursor-pointer" onClick={() => handleOpenEditModal("Club Name", club.displayName || "")} />
                            </span>
                            <span className="text-xl">
                                Club officer name:
                                {" "}
                                {club.officer}
                                <FontAwesomeIcon icon={faPenToSquare} className="ml-1 hover:cursor-pointer" onClick={() => handleOpenEditModal("Officer Name", club.officer || "")} />
                            </span>
                            <span className="text-xl">
                                Allow Member self-registration:
                                <input
                                    type="checkbox"
                                    className="border-0 shadow-xs ml-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset text-accent-100 transition-all hover:cursor-pointer size-6"
                                    onChange={handleSelfCheckboxChange}
                                    checked={isSelfChecked}
                                />
                            </span>
                            <span className="text-xl">
                                Enable static QR-Code:
                                <input
                                    type="checkbox"
                                    className="border-0 shadow-xs ml-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset text-accent-100 transition-all hover:cursor-pointer size-6"
                                    onChange={handleQrCheckboxChange}
                                    checked={isQrChecked}
                                />
                            </span>
                            <button
                                disabled={!isQrChecked}
                                className="bg-accent-100 hover:bg-accent-200 disabled:hover:bg-slate-300 disabled:bg-slate-300 mr-2 px-[20px] py-[10px] rounded-lg w-full text-[15.5px] transition-colors disabled:hover:cursor-not-allowed"
                                onClick={() => setShowQrModal(true)}
                            >
                                <FontAwesomeIcon icon={faQrcode} size="lg" />
                                {" "}
                                QR Code
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 mr-2 px-[20px] py-[10px] rounded-lg w-full text-[15.5px] transition-colors"
                                onClick={handleDeleteClub}
                            >
                                <FontAwesomeIcon icon={faTrash} size="lg" />
                                {" "}
                                Delete club
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showEditModal}
                onClose={handleCloseEditModal}
                onSubmit={handleSubmit}
                title={`Edit ${fieldToEdit}`}
            >
                <input
                    type="text"
                    className="border-greyscale-200 bg-greyscale-100 mb-4 p-2 border rounded-lg focus:ring-accent-100 w-full transition-all"
                    value={newFieldValue}
                    onChange={e => setNewFieldValue(e.target.value)}
                    required
                />
            </Modal>

            <Modal
                isOpen={showQrModal}
                onClose={() => setShowQrModal(false)}
                title="Attendance QR Code"
                closeText="Close"
            >
                <span className="mb-4">This is used for attendance check-in. Your club members can scan this at every meeting to attend.</span>
                <div className="flex justify-center mt-4">
                    <img
                        ref={qrCodeRef}
                        className="w-64"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://clubattendance.com/attend?code=${club.externalId}`}
                        alt="QR Code"
                    />
                </div>
                <button
                    className="inline bg-accent-100 hover:bg-accent-100 mt-6 mr-3 px-4 py-2 rounded-lg text-white transition-colors"
                    onClick={handleDownloadQrCode}
                >
                    <FontAwesomeIcon icon={faDownload} size="lg" />
                    {" "}
                    Save
                </button>
            </Modal>
        </>
    )
}

export default Settings
