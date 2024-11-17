import { useState } from "react";
import { Helmet } from "react-helmet";
import { deleteClub } from "../../services/DeleteData";
import { updateClubName, updateOfficerName } from "../../services/UpdateData";
import { useNavigate } from "react-router-dom";

function Settings({ club }: { club: any }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState("");
    const [newFieldValue, setNewFieldValue] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleIconClick = (field: string, currentValue: string) => {
        setFieldToEdit(field);
        setNewFieldValue(currentValue);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
        setIsModalOpen(false);
    };

    const handleDeleteClub = async () => {
        const result = await deleteClub();
        if (result) {
            navigate("/"); // Navigate to home page if deleteClub returns true
        }
    };

    return (
        <>
            <Helmet>
                <title>Club Settings | Club Attendance</title>
            </Helmet>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[40%] bg-greyscale-100 rounded-lg h-[400px] p-8">
                    <div className="mx-auto flex w-[100%] flex-col gap-10 mb-5 items-left">
                        <span className="text-2xl font-bold ml-2 self-center">Club Settings</span>
                        <div className="flex flex-col w-fit gap-6">
                            <span className="text-xl">
                                Club name: {club.displayName}
                                <i
                                    className="fa-solid fa-pen-to-square hover:cursor-pointer ml-1"
                                    onClick={() => handleIconClick("Club Name", club.displayName)}
                                />
                            </span>
                            <span className="text-xl">
                                Club officer name: {club.officer}
                                <i
                                    className="fa-solid fa-pen-to-square hover:cursor-pointer ml-1"
                                    onClick={() => handleIconClick("Officer Name", club.officer)}
                                />
                            </span>
                            <span className="text-xl">
                                Enable static QR-Code:
                                <input
                                    type="checkbox"
                                    className="w-6 h-6 ml-2 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                            </span>
                            <button
                                disabled={!isChecked}
                                className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 w-[150px]  disabled:bg-slate-300 disabled:hover:cursor-not-allowed disabled:hover:bg-slate-300"
                            >
                                <i className="fa-solid fa-code fa-lg" /> QR Code
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 w-[150px]"
                                onClick={handleDeleteClub}
                            >
                                <i className="fa-solid fa-trash fa-lg" /> Delete club
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
                        <h2 className="text-2xl font-bold mb-4">Edit {fieldToEdit}</h2>
                        <input
                            type="text"
                            className="border p-2 w-full mb-4 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                            value={newFieldValue}
                            onChange={(e) => setNewFieldValue(e.target.value)}
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