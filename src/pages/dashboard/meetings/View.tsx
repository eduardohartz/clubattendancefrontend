/* eslint ts/no-redeclare: 0 */ // --> OFF

import type { Meeting, Member } from "../../../types/models"
import { faArrowLeft, faDownload, faPlus, faPowerOff, faQrcode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect, useRef, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, Navigate, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import Modal from "../../../components/Modal"
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
    const [showAddModal, setShowAddModal] = useState(false)
    const [showQrModal, setShowQrModal] = useState(false)
    const [meeting, setMeeting] = useState<Meeting | null>(null)
    const [loading, setLoading] = useState(true)
    const [showAttendees, setShowAttendees] = useState(true)
    const [duration, setDuration] = useState<string>("")
    const [volunteering, setVolunteering] = useState<boolean>(false)
    const [notes, setNotes] = useState<string>("")
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
        return (
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <Loading />
            </div>
        )
    }

    if (!meeting) {
        return <Navigate to="/dashboard/meetings" />
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
            setShowAddModal(false)
            return
        }
        await createAttendee(selectedMember, meeting.id)
        setShowAddModal(false)
    }

    const handleSaveChanges = async () => {
        await updateMeeting(meeting.id, notes, volunteering)
    }

    const handleEndMeeting = async () => {
        await updateMeeting(meeting.id, notes, volunteering, true)
        fetchMeeting()
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

    const addMemberModalContent = (
        <>
            <select
                className="block border-greyscale-200 bg-greyscale-100 my-4 mb-5 border rounded-lg focus:ring-accent-100 w-full transition-all hover:cursor-pointer"
                onChange={e => setSelectedMember(e.target.value)}
                defaultValue={selectedMember}
            >
                <option value="" disabled>Select member</option>
                {members.map((member: Member) => (
                    <option key={member.id} value={member.id}>
                        {member.firstName}
                        {" "}
                        {member.lastName}
                    </option>
                ))}
                <option value="new">-Add new member</option>
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
        </>
    )

    const qrModalContent = (
        <>
            <span className="mb-4">This is used for attendance check-in. Your club members can scan this code to attend this meetingId.</span>
            <div className="flex justify-center mt-4">
                <img
                    ref={qrCodeRef}
                    className="w-64"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://clubattendance.com/attend?code=${meeting.code || club.externalId}`}
                    alt="QR Code"
                />
            </div>
            <button
                className="bg-accent-100 hover:bg-accent-100 mt-6 mr-3 px-4 py-2 rounded-lg text-white transition-colors"
                onClick={handleDownloadQrCode}
            >
                <FontAwesomeIcon icon={faDownload} size="lg" />
                {" "}
                Download
            </button>
        </>
    )

    return (
        <PageTransition>
            <HelmetProvider>
                <Helmet>
                    <title>Meeting | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <div className="top-[100px] absolute w-[996px] 2xl:w-[1400px] max-w-[90%]">
                    <div className="flex justify-between items-center mx-auto mb-5 w-full">
                        <span className="justify-start ml-2 font-bold text-2xl">
                            Meeting
                            {` ${formatDate(meeting.startTime.toString())}`}
                        </span>
                        <Link to="/dashboard/meetings">
                            <button className="justify-end bg-greyscale-200 hover:bg-greyscale-300 mr-2 px-[25px] py-[12px] rounded-lg text-[13.5px] transition-colors">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                {" "}
                                Back
                            </button>
                        </Link>
                    </div>
                    <div className="bg-greyscale-100 rounded-lg w-full h-[300px] outline outline-greyscale-200">
                        <div className="justify-center gap-4 grid grid-cols-1 md:grid-cols-3 px-5 py-4 w-full">
                            <div className="flex justify-center bg-greyscale-200 p-2 rounded-md">
                                <span className="font-mono text-lg">Start Time:</span>
                                <span className="ml-2 font-mono text-lg">{formatTime(meeting.startTime.toString())}</span>
                            </div>
                            <div className="flex justify-center bg-greyscale-200 p-2 rounded-md">
                                <span className="font-mono text-lg">End Time:</span>
                                <span className="ml-2 font-mono text-lg">{formatTime(meeting.endTime?.toString() || "")}</span>
                            </div>
                            <div className="flex justify-center bg-greyscale-200 p-2 rounded-md">
                                <span className="font-mono text-lg">Duration:</span>
                                <span className="ml-2 font-mono text-lg">{duration}</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 px-5 py-1 w-full">
                            <div className="w-1/2">
                                <div className="flex items-end gap-2 size-full">
                                    <button className="relative right-1 justify-end bg-accent-100 hover:bg-accent-200 disabled:hover:bg-accent-90 disabled:bg-accent-90 ml-1 px-[25px] py-[12px] rounded-lg text-[13px] transition-colors disabled:cursor-not-allowed" onClick={() => setShowQrModal(true)} disabled={meeting.endTime != null}>
                                        <FontAwesomeIcon icon={faQrcode} size="lg" />
                                        {" "}
                                        QR-Code
                                    </button>
                                    <button className="relative right-1 justify-end bg-accent-100 hover:bg-accent-200 ml-1 px-[25px] py-[12px] rounded-lg text-[13px] transition-colors" onClick={() => setShowAddModal(true)}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                        {" "}
                                        Add manually
                                    </button>
                                    <button className="relative right-1 justify-end bg-greyscale-200 hover:bg-greyscale-300 disabled:hover:bg-greyscale-200 ml-1 px-[25px] py-[12px] rounded-lg text-[13px] text-warningred transition-colors disabled:cursor-not-allowed" onClick={handleEndMeeting} disabled={meeting.endTime != null}>
                                        <FontAwesomeIcon icon={faPowerOff} size="lg" />
                                        {" "}
                                        End Meeting
                                    </button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <textarea
                                    className="bg-greyscale-200 border-none rounded-lg focus:ring-2 focus:ring-accent-100 w-full h-36 transition-all resize-none"
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
                                                className="border-0 shadow-xs ml-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset text-accent-100 transition-all hover:cursor-pointer size-6"
                                                checked={volunteering}
                                                onChange={() => setVolunteering(!volunteering)}
                                            />
                                        </span>
                                    )}
                                    <button className="relative right-0 justify-end bg-accent-100 hover:bg-accent-200 px-[25px] py-[12px] rounded-lg text-[13.5px] transition-colors" onClick={handleSaveChanges}>
                                        <FontAwesomeIcon icon={faDownload} size="lg" />
                                        {" "}
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="text-lg">Show attendees</span>
                        <input
                            type="checkbox"
                            className="border-0 shadow-xs mb-0 ml-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset text-accent-100 transition-all hover:cursor-pointer size-5"
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

            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleSubmit}
                title="Add member manually"
                submitText="Add"
            >
                {addMemberModalContent}
            </Modal>

            <Modal
                isOpen={showQrModal}
                onClose={() => setShowQrModal(false)}
                title="Attendance QR Code"
            >
                {qrModalContent}
            </Modal>
        </PageTransition>
    )
}

export default Meeting
