/* eslint ts/no-redeclare: 0 */ // --> OFF

import type { Meeting, Member } from "../../../types/models"
import { faArrowLeft, faDownload, faPlus, faPowerOff, faQrcode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect, useRef, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, Navigate, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import PageTransition from "../../../components/PageTransition"
import Table from "../../../components/Table"
import { errorToast } from "../../../components/Toast"
import { createAttendee, createMember } from "../../../services/CreateData"
import { FetchData } from "../../../services/FetchData"
import { updateMeeting } from "../../../services/UpdateData"
import { useAuth } from "../../../utils/AuthContext"
import { formatDate, formatTime } from "../../../utils/Formatters"

function Meeting() {

    const { user, club } = useAuth()
    const { id } = useParams<{ id: string }>()
    const [meeting, setMeeting] = useState<Meeting | null>(null)
    const [loading, setLoading] = useState(true)
    const [showAttendees, setShowAttendees] = useState(true)
    const [duration, setDuration] = useState<string>("")
    const [volunteering, setVolunteering] = useState<boolean>(false)
    const [notes, setNotes] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isQrModalOpen, setIsQrModalOpen] = useState(false)
    const [isQrModalVisible, setIsQrModalVisible] = useState(false)
    const qrCodeRef = useRef<HTMLImageElement>(null)
    const [members, setMembers] = useState<Member[]>([])
    const [selectedMember, setSelectedMember] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    useEffect(() => {
        const fetchMembers = async () => {
            const data = await FetchData({ type: "members" })
            setMembers(data)
        }
        fetchMembers()
    }, [])

    const fetchMeeting = useCallback(async () => {
        setLoading(true)
        try {
            const data = await FetchData({ type: "meetings", id })
            setMeeting(data)
        } catch {
            setMeeting(null)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchMeeting()
    }, [id, fetchMeeting])

    useEffect(() => {
        if (meeting === null)
            return

        setVolunteering(meeting.volunteering || false)
        setNotes(meeting.notes || "")

        const updateDuration = () => {
            const now = new Date().getTime()
            const durationMs = ((meeting.endTime ?? now / 1000) * 1000) - (meeting.startTime * 1000)
            const durationSec = Math.floor(durationMs / 1000)
            const hours = Math.floor(durationSec / 3600)
            const minutes = Math.floor((durationSec % 3600) / 60)
            const seconds = durationSec % 60

            const durationStr = `${hours.toString().padStart(2, "0")}h:${minutes
                .toString()
                .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`
            setDuration(durationStr)

            if (meeting.endTime) {
                clearInterval(intervalId)
            }
        }

        const intervalId = setInterval(updateDuration, 1000)
        updateDuration()

        return () => clearInterval(intervalId)
    }, [meeting])

    if (!user || !club)
        return null

    if (loading) {
        return <Loading />
    }

    if (!meeting) {
        return <Navigate to="/dashboard/meetings" />
    }

    const handleOpenModal = () => {
        setIsModalVisible(true)
        setTimeout(() => setIsModalOpen(true), 200)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setIsModalVisible(false), 300)
    }

    const handleSubmit = async () => {
        if (selectedMember === "") {
            errorToast("Please select a member!")
            return
        }
        if (selectedMember === "new") {
            if (!firstName || !lastName) {
                errorToast("Please fill in all fields!")
                return
            }
            const id = await createMember(firstName, lastName)
            if (!id) {
                return
            }
            await createAttendee(id, meeting.id)
            handleCloseModal()
            return
        }
        await createAttendee(selectedMember, meeting.id)
        handleCloseModal()
    }

    const handleSaveChanges = async () => {
        await updateMeeting(meeting.id, notes, volunteering)
    }

    const handleEndMeeting = async () => {
        await updateMeeting(meeting.id, notes, volunteering, true)
        fetchMeeting()
    }

    const handleOpenQrModal = () => {
        setIsQrModalVisible(true)
        setTimeout(() => setIsQrModalOpen(true), 200)
    }

    const handleCloseQrModal = () => {
        setIsQrModalOpen(false)
        setTimeout(() => setIsQrModalVisible(false), 300)
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
        <PageTransition>
            <HelmetProvider>
                <Helmet>
                    <title>Meeting | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] w-[80%] max-w-[1000px]">
                    <div className="mx-auto flex w-full items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">
                            Meeting
                            {` ${formatDate(meeting.startTime.toString())}`}
                        </span>
                        <Link to="/dashboard/meetings">
                            <button className="bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                {" "}
                                Back
                            </button>
                        </Link>
                    </div>
                    <div className="w-full h-[300px] bg-greyscale-100 rounded-lg outline-1 outline-greyscale-200 outline">
                        <div className="w-full px-5 grid grid-cols-1 md:grid-cols-3 gap-4 justify-center py-4">
                            <div className="bg-greyscale-200 rounded-md p-2 flex justify-center">
                                <span className="text-lg font-mono">Start Time:</span>
                                <span className="ml-2 text-lg font-mono">{formatTime(meeting.startTime.toString())}</span>
                            </div>
                            <div className="bg-greyscale-200 rounded-md p-2 flex justify-center">
                                <span className="text-lg font-mono">End Time:</span>
                                <span className="ml-2 text-lg font-mono">{formatTime(meeting.endTime?.toString() || "")}</span>
                            </div>
                            <div className="bg-greyscale-200 rounded-md p-2 flex justify-center">
                                <span className="text-lg font-mono">Duration:</span>
                                <span className="ml-2 text-lg font-mono">{duration}</span>
                            </div>
                        </div>
                        <div className="w-full px-5 flex gap-4 justify-center py-1">
                            <div className="w-1/2">
                                <div className="w-full h-full flex items-end gap-2">
                                    <button className="right-1 relative bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] justify-end ml-1 disabled:cursor-not-allowed disabled:bg-accent-90 disabled:hover:bg-accent-90" onClick={handleOpenQrModal} disabled={meeting.endTime != null}>
                                        <FontAwesomeIcon icon={faQrcode} size="lg" />
                                        {" "}
                                        QR-Code
                                    </button>
                                    <button className="right-1 relative bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] justify-end ml-1" onClick={handleOpenModal}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                        {" "}
                                        Add manually
                                    </button>
                                    <button className="right-1 relative text-warningred bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] justify-end ml-1 disabled:cursor-not-allowed disabled:hover:bg-greyscale-200" onClick={handleEndMeeting} disabled={meeting.endTime != null}>
                                        <FontAwesomeIcon icon={faPowerOff} size="lg" />
                                        {" "}
                                        End Meeting
                                    </button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <textarea
                                    className="h-36 w-full rounded-lg bg-greyscale-200 border-none resize-none transition-all focus:ring-2 focus:ring-accent-100"
                                    placeholder="Meeting notes"
                                    value={notes}
                                    onChange={e => setNotes(e.currentTarget.value)}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    {club.volunteering && (
                                        <span className="text-lg">
                                            Volunteering:
                                            <input
                                                type="checkbox"
                                                className="w-6 h-6 ml-2 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all hover:cursor-pointer"
                                                checked={volunteering}
                                                onChange={() => setVolunteering(!volunteering)}
                                            />
                                        </span>
                                    )}
                                    <button className="right-0 relative bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] justify-end" onClick={handleSaveChanges}>
                                        <FontAwesomeIcon icon={faDownload} size="lg" />
                                        {" "}
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className="text-lg">Show attendees</span>
                        <input
                            type="checkbox"
                            className="w-5 h-5 ml-2 mb-[0px] rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all hover:cursor-pointer"
                            checked={showAttendees}
                            onChange={() => setShowAttendees(!showAttendees)}
                        />
                    </div>
                    {showAttendees && (
                        <div className="mt-4">
                            <Table type="attendees" id={id} />
                        </div>
                    )}
                </div>
            </div>
            {isModalVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`bg-white w-[500px] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isModalOpen ? "scale-100" : "scale-95"}`}
                    >
                        <h2 className="text-2xl font-bold mb-4">Add member manually</h2>
                        <select className="border my-4 block w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100 hover:cursor-pointer" onChange={e => setSelectedMember(e.target.value)} defaultValue={selectedMember}>
                            <option value="" disabled>Select member</option>
                            {members.map((member: Member) => (
                                <option key={member.id} value={member.id}>
                                    {member.firstName}
                                    {" "}
                                    {member.lastName}
                                </option>
                            ))}
                            <option value="new"> -Add new member</option>
                        </select>
                        {selectedMember === "new" && (
                            <div className="flex flex-col gap-4 my-4">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="rounded-lg w-full"
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    className="rounded-lg w-full"
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                />
                            </div>
                        )}
                        <button
                            className="bg-accent-100 hover:bg-accent-200 text-white px-4 py-2 rounded-lg mr-2 transition-colors"
                            onClick={handleSubmit}
                        >
                            Add
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
                        <span className="mb-4">This is used for attendance check-in. Your club members can scan this code to attend this meetingId.</span>
                        <div className="flex justify-center mt-4">
                            <img ref={qrCodeRef} className="w-64" src={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://clubattendance.com/attend?code=${meeting.code || club.externalId}`} alt="QR Code" />
                        </div>
                        <button
                            className="bg-accent-100 mr-3 hover:bg-accent-100 text-white px-4 py-2 rounded-lg transition-colors mt-6"
                            onClick={handleDownloadQrCode}
                        >
                            Download
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
        </PageTransition>
    )
}

export default Meeting
