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
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="absolute top-[100px] h-[365px] w-[500px] max-w-[90%] rounded-lg bg-greyscale-100 p-8">
                    <div className="items-left mx-auto mb-5 flex w-full flex-col gap-8">
                        <span className="ml-2 self-center text-3xl font-bold">Club Settings</span>
                        <div className="flex w-full flex-col gap-2">
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
                                    className="ml-2 size-6 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:cursor-pointer focus:ring-2 focus:ring-inset focus:ring-accent-200"
                                    onChange={handleSelfCheckboxChange}
                                    checked={isSelfChecked}
                                />
                            </span>
                            <span className="text-xl">
                                Enable static QR-Code:
                                <input
                                    type="checkbox"
                                    className="ml-2 size-6 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:cursor-pointer focus:ring-2 focus:ring-inset focus:ring-accent-200"
                                    onChange={handleQrCheckboxChange}
                                    checked={isQrChecked}
                                />
                            </span>
                            <button
                                disabled={!isQrChecked}
                                className="mr-2 w-full rounded-lg bg-accent-100 px-[20px] py-[10px] text-[15.5px] transition-colors hover:bg-accent-200  disabled:bg-slate-300 disabled:hover:cursor-not-allowed disabled:hover:bg-slate-300"
                                onClick={() => setShowQrModal(true)}
                            >
                                <FontAwesomeIcon icon={faQrcode} size="lg" />
                                {" "}
                                QR Code
                            </button>
                            <button
                                className="mr-2 w-full rounded-lg bg-red-400 px-[20px] py-[10px] text-[15.5px] transition-colors hover:bg-red-500"
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
                    className="mb-4 w-full rounded-lg border border-greyscale-200 bg-greyscale-100 p-2 transition-all focus:ring-accent-100"
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
                <div className="mt-4 flex justify-center">
                    <img
                        ref={qrCodeRef}
                        className="w-64"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://clubattendance.com/attend?code=${club.externalId}`}
                        alt="QR Code"
                    />
                </div>
                <button
                    className="mr-3 mt-6 inline rounded-lg bg-accent-100 px-4 py-2 text-white transition-colors hover:bg-accent-100"
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
