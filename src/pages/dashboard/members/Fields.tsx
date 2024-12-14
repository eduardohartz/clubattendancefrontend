import type { Club, User } from "../../../types/models"
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Table from "../../../components/Table"
import { errorToast, successToast } from "../../../components/Toast"
import { createCustomField } from "../../../services/CreateData"
import { FetchData } from "../../../services/FetchData"

function CustomFields({ user, club }: { user: User | null, club: Club | null }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState("Add custom field")
    const [modalBtnText, setModalBtnText] = useState("Add")
    const [fieldName, setFieldName] = useState("")
    const [fieldType, setFieldType] = useState("text")
    const [dropdownOptions, setDropdownOptions] = useState<string>("")
    const [defaultValue, setDefaultValue] = useState<string>("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const editId = searchParams.get("id")

    useEffect(() => {
        if (editId) {
            FetchData({ type: "customFields", id: editId }).then((data) => {
                if (data.id) {
                    setModalTitle("Edit custom field")
                    setModalBtnText("Save")
                    setFieldName(data.fieldName)
                    setFieldType(data.fieldType)
                    if (data.fieldType === "dropdown") {
                        setDropdownOptions(data.dropdownOptions.join(", "))
                    }
                    setDefaultValue(data.defaultValue)
                    handleOpenModal()
                }
            })
        }
    }, [editId])

    const parsedDropdownOptions = dropdownOptions === "" ? [] : dropdownOptions.split(",").map(value => value.trim())

    const handleDropdownOptionssChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDropdownOptions(event.target.value)
    }

    const handleOpenModal = () => {
        setIsModalVisible(true)
        setTimeout(() => setIsModalOpen(true), 200)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => {
            setIsModalVisible(false)
            setFieldName("")
            setFieldType("text")
            setDropdownOptions("")
            setDefaultValue("")
            if (editId) {
                navigate("/dashboard/members/fields")
            }
        }, 300)
    }

    const handleSubmit = async () => {
        if (fieldName === "" || fieldType === "" || (fieldType === "dropdown" && dropdownOptions === "")) {
            errorToast("Please fill in all fields")
            return
        }

        const success = await createCustomField(fieldName, fieldType, parsedDropdownOptions, defaultValue)

        if (success) {
            setFieldName("")
            setFieldType("text")
            setDropdownOptions("")
            setDefaultValue("")
            navigate(0)
            successToast("Field created")
        }

        handleCloseModal()
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Edit Custom Fields | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Edit Custom Fields</span>
                        <div className="mr-2 justify-end flex gap-1">
                            <Link to="/dashboard/members">
                                <button className="bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end">
                                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                    {" "}
                                    Back
                                </button>
                            </Link>
                            <button className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px]" onClick={handleOpenModal}>
                                <FontAwesomeIcon icon={faPlus} size="lg" />
                                {" "}
                                Add Field
                            </button>
                        </div>
                    </div>
                    <Table type="customFields" user={user} club={club} />
                </div>
            </div>
            {isModalVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`bg-white w-[500px] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isModalOpen ? "scale-100" : "scale-95"}`}
                    >
                        <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>

                        <label className="text-lg">Field name</label>
                        <input
                            type="text"
                            className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100 hover:cursor-pointer"
                            value={fieldName}
                            onChange={e => setFieldName(e.target.value)}
                            required
                        />

                        <label className="text-lg">Field type</label>
                        <select
                            className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100 hover:cursor-pointer"
                            required
                            defaultValue={fieldType}
                            onChange={e => setFieldType(e.target.value)}
                        >
                            <option value="text">Text</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="date">Date</option>
                        </select>

                        {fieldType === "dropdown" && (
                            <>
                                <label className="text-lg">Dropdown values</label>
                                <input
                                    type="text"
                                    className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                                    required
                                    placeholder="value1, value2, value3"
                                    value={dropdownOptions}
                                    onChange={handleDropdownOptionssChange}
                                />
                            </>
                        )}

                        <label className="text-lg">Default value</label>
                        {fieldType === "dropdown"
                            ? (
                                <select
                                    className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                                    required
                                    defaultValue=""
                                    onChange={e => setDefaultValue(e.target.value)}
                                >
                                    <option value="">None</option>
                                    {parsedDropdownOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )
                            : fieldType === "checkbox"
                                ? (
                                    <select
                                        className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                                        required
                                        defaultValue="false"
                                        onChange={e => setDefaultValue(e.target.value)}
                                    >
                                        <option value="false">Not checked</option>
                                        <option value="true">Checked</option>
                                    </select>
                                )
                                : (
                                    <input
                                        type="text"
                                        className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                                        required
                                        value={defaultValue}
                                        onChange={e => setDefaultValue(e.target.value)}
                                    />
                                )}

                        <button
                            className="bg-accent-100 hover:bg-accent-200 text-white px-4 py-2 rounded-lg mr-2 transition-colors"
                            onClick={handleSubmit}
                        >
                            {modalBtnText}
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
    )
}

export default CustomFields
