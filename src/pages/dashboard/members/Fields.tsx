import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Table from "../../../components/Table"
import Modal from "../../../components/Modal"
import { errorToast, successToast } from "../../../components/Toast"
import { createCustomField } from "../../../services/CreateData"
import { FetchData } from "../../../services/FetchData"

function CustomFields() {
    const [showModal, setShowModal] = useState(false)
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
                    setFieldName(data.fieldName)
                    setFieldType(data.fieldType)
                    if (data.fieldType === "dropdown") {
                        setDropdownOptions(data.dropdownOptions.join(", "))
                    }
                    setDefaultValue(data.defaultValue)
                    setShowModal(true)
                }
            })
        }
    }, [editId])

    const handleCloseModal = () => {
        setShowModal(false)
        setFieldName("")
        setFieldType("text")
        setDropdownOptions("")
        setDefaultValue("")
        if (editId) {
            navigate("/dashboard/members/fields")
        }
    }

    const handleSubmit = async () => {
        if (fieldName === "" || fieldType === "" || (fieldType === "dropdown" && dropdownOptions === "")) {
            errorToast("Please fill in all fields")
            return
        }

        const parsedDropdownOptions = dropdownOptions === "" ? [] : dropdownOptions.split(",").map(value => value.trim())
        const success = await createCustomField(fieldName, fieldType, parsedDropdownOptions, defaultValue)

        if (success) {
            handleCloseModal()
            navigate(0)
            successToast("Field created")
        }
    }

    const modalContent = (
        <>
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
                value={fieldType}
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
                        onChange={e => setDropdownOptions(e.target.value)}
                    />
                </>
            )}

            <label className="text-lg">Default value</label>
            {fieldType === "dropdown" ? (
                <select
                    className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                    required
                    value={defaultValue}
                    onChange={e => setDefaultValue(e.target.value)}
                >
                    <option value="">None</option>
                    {dropdownOptions.split(",").map((option, index) => (
                        <option key={index} value={option.trim()}>
                            {option.trim()}
                        </option>
                    ))}
                </select>
            ) : fieldType === "checkbox" ? (
                <select
                    className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                    required
                    value={defaultValue}
                    onChange={e => setDefaultValue(e.target.value)}
                >
                    <option value="false">Not checked</option>
                    <option value="true">Checked</option>
                </select>
            ) : (
                <input
                    type="text"
                    className="border mt-2 p-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100"
                    required
                    value={defaultValue}
                    onChange={e => setDefaultValue(e.target.value)}
                />
            )}
        </>
    )

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
                                    <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Back
                                </button>
                            </Link>
                            <button
                                className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px]"
                                onClick={() => setShowModal(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} size="lg" /> Add Field
                            </button>
                        </div>
                    </div>
                    <Table type="customFields" />
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                title={editId ? "Edit custom field" : "Add custom field"}
                submitText={editId ? "Save" : "Add"}
            >
                {modalContent}
            </Modal>
        </>
    )
}

export default CustomFields