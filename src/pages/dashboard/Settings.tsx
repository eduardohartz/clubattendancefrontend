import { useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { deleteClub } from "../../services/DeleteData";
import { updateAllowSelfRegistration, updateClubName, updateOfficerName, updateUseStaticCode } from "../../services/UpdateData";
import { useNavigate } from "react-router-dom";
import { faDownload, faQrcode, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Settings({ club }: { club: any }) {

    if (!club)
        return

    const [isQrChecked, setIsQrChecked] = useState(club.useStaticCode);
    const [isSelfChecked, setIsSelfChecked] = useState(club.allowSelfRegistration);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hasRendered, setHasRendered] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState("");
    const [newFieldValue, setNewFieldValue] = useState("");
    const qrCodeRef = useRef<HTMLImageElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setHasRendered(true)
    }, []);

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isQrModalVisible, setIsQrModalVisible] = useState(false);

    const handleOpenModal = (field: string, currentValue: string) => {
        if (!hasRendered) return;
        setFieldToEdit(field);
        setNewFieldValue(currentValue);
        setIsModalVisible(true);
        setTimeout(() => setIsModalOpen(true), 0);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setIsModalVisible(false), 300);
        setFieldToEdit("");
        setNewFieldValue("");
    };

    const handleSubmit = () => {
        if (fieldToEdit === "Club Name") {
            updateClubName(newFieldValue);
            club.displayName = newFieldValue;
        } else if (fieldToEdit === "Officer Name") {
            updateOfficerName(newFieldValue);
            club.officer = newFieldValue;
        }
        handleCloseModal();
    };

    const handleQrCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsQrChecked(checked);
        await updateUseStaticCode(checked);
    };

    const handleSelfCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsSelfChecked(checked);
        await updateAllowSelfRegistration(checked);
    };

    const handleDeleteClub = async () => {
        const result = await deleteClub();
        if (result) {
            navigate("/")
        }
    };

    const handleOpenQrModal = () => {
        if (!hasRendered) return;
        setIsQrModalVisible(true)
        setTimeout(() => setIsQrModalOpen(true), 200)
    };

    const handleCloseQrModal = () => {
        setIsQrModalOpen(false)
        setTimeout(() => setIsQrModalVisible(false), 300)
    };

    const handleDownloadQrCode = () => {
        if (qrCodeRef.current) {
            const link = document.createElement('a');
            link.href = qrCodeRef.current.src;
            link.target = '_blank';
            link.download = 'qr_code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Club Settings | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[40%] bg-greyscale-100 rounded-lg h-[365px] p-8">
                    <div className="mx-auto flex w-[100%] flex-col gap-8 mb-5 items-left">
                        <span className="text-3xl font-bold ml-2 self-center">Club Settings</span>
                        <div className="flex flex-col w-full gap-2">
                            <span className="text-xl">
                                Club name: {club.displayName}
                                <i
                                    className="fa-solid fa-pen-to-square hover:cursor-pointer ml-1"
                                    onClick={() => handleOpenModal("Club Name", club.displayName)}
                                />
                            </span>
                            <span className="text-xl">
                                Club officer name: {club.officer}
                                <i
                                    className="fa-solid fa-pen-to-square hover:cursor-pointer ml-1"
                                    onClick={() => handleOpenModal("Officer Name", club.officer)}
                                />
                            </span>
                            <span className="text-xl">
                                Allow Member self-registration:
                                <input
                                    type="checkbox"
                                    className="w-6 h-6 ml-2 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all hover:cursor-pointer"
                                    onChange={handleSelfCheckboxChange}
                                    checked={isSelfChecked}
                                />
                            </span>
                            <span className="text-xl">
                                Enable static QR-Code:
                                <input
                                    type="checkbox"
                                    className="w-6 h-6 ml-2 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all hover:cursor-pointer"
                                    onChange={handleQrCheckboxChange}
                                    checked={isQrChecked}
                                />
                            </span>
                            <button
                                disabled={!isQrChecked}
                                className="bg-accent-100 hover:bg-accent-200 transition-colors px-[20px] py-[10px] rounded-lg text-[15.5px] mr-2 w-full  disabled:bg-slate-300 disabled:hover:cursor-not-allowed disabled:hover:bg-slate-300"
                                onClick={handleOpenQrModal}
                            >
                                <FontAwesomeIcon icon={faQrcode} size="lg" /> QR Code
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 transition-colors px-[20px] py-[10px] rounded-lg text-[15.5px] mr-2 w-full"
                                onClick={handleDeleteClub}
                            >
                                <FontAwesomeIcon icon={faTrash} size="lg" /> Delete club
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
                        <h2 className="text-2xl font-bold mb-4">Edit {fieldToEdit}</h2>
                        <input
                            type="text"
                            className="border p-2 w-full mb-4 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                            value={newFieldValue}
                            onChange={(e) => setNewFieldValue(e.target.value)}
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
            {isQrModalVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isQrModalOpen ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`bg-white w-[500px] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isQrModalOpen ? "scale-100" : "scale-95"}`}
                    >
                        <h2 className="text-2xl font-bold mb-4">Attendance QR Code</h2>
                        <span className="mb-4">This is used for attendance check-in. Your club members can scan this at every meeting to attend.</span>
                        <div className="flex justify-center mt-4">
                            <img ref={qrCodeRef} className="w-64" src={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://clubattendance.com/attend?code=${club.externalId}`} alt="QR Code" />
                        </div>
                        <button
                            className="bg-accent-100 mr-3 hover:bg-accent-100 text-white px-4 py-2 rounded-lg transition-colors mt-6"
                            onClick={handleDownloadQrCode}
                        >
                            <FontAwesomeIcon icon={faDownload} size="lg" /> Save

                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors mt-6"
                            onClick={handleCloseQrModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Settings;