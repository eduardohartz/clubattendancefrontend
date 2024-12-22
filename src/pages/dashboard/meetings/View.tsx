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
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
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
                className="my-4 mb-5 block w-full rounded-lg border border-greyscale-200 bg-greyscale-100 transition-all hover:cursor-pointer focus:ring-accent-100"
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
                <div className="my-4 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="First name"
                        className="w-full rounded-lg"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        className="w-full rounded-lg"
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
            <div className="mt-4 flex justify-center">
                <img
                    ref={qrCodeRef}
                    className="w-64"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://clubattendance.com/attend?code=${meeting.code || club.externalId}`}
                    alt="QR Code"
                />
            </div>
            <button
                className="mr-3 mt-6 rounded-lg bg-accent-100 px-4 py-2 text-white transition-colors hover:bg-accent-100"
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
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="absolute top-[100px] w-[996px] max-w-[90%] 2xl:w-[1400px]">
                    <div className="mx-auto mb-5 flex w-full items-center justify-between">
                        <span className="ml-2 justify-start text-2xl font-bold">
                            Meeting
                            {` ${formatDate(meeting.startTime.toString())}`}
                        </span>
                        <Link to="/dashboard/meetings">
                            <button className="mr-2 justify-end rounded-lg bg-greyscale-200 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-greyscale-300">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                {" "}
                                Back
                            </button>
                        </Link>
                    </div>
                    <div className="h-[300px] w-full rounded-lg bg-greyscale-100 outline outline-1 outline-greyscale-200">
                        <div className="grid w-full grid-cols-1 justify-center gap-4 px-5 py-4 md:grid-cols-3">
                            <div className="flex justify-center rounded-md bg-greyscale-200 p-2">
                                <span className="font-mono text-lg">Start Time:</span>
                                <span className="ml-2 font-mono text-lg">{formatTime(meeting.startTime.toString())}</span>
                            </div>
                            <div className="flex justify-center rounded-md bg-greyscale-200 p-2">
                                <span className="font-mono text-lg">End Time:</span>
                                <span className="ml-2 font-mono text-lg">{formatTime(meeting.endTime?.toString() || "")}</span>
                            </div>
                            <div className="flex justify-center rounded-md bg-greyscale-200 p-2">
                                <span className="font-mono text-lg">Duration:</span>
                                <span className="ml-2 font-mono text-lg">{duration}</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-center gap-4 px-5 py-1">
                            <div className="w-1/2">
                                <div className="flex size-full items-end gap-2">
                                    <button className="relative right-1 ml-1 justify-end rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13px] transition-colors hover:bg-accent-200 disabled:cursor-not-allowed disabled:bg-accent-90 disabled:hover:bg-accent-90" onClick={() => setShowQrModal(true)} disabled={meeting.endTime != null}>
                                        <FontAwesomeIcon icon={faQrcode} size="lg" />
                                        {" "}
                                        QR-Code
                                    </button>
                                    <button className="relative right-1 ml-1 justify-end rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13px] transition-colors hover:bg-accent-200" onClick={() => setShowAddModal(true)}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                        {" "}
                                        Add manually
                                    </button>
                                    <button className="relative right-1 ml-1 justify-end rounded-lg bg-greyscale-200 px-[25px] py-[12px] text-[13px] text-warningred transition-colors hover:bg-greyscale-300 disabled:cursor-not-allowed disabled:hover:bg-greyscale-200" onClick={handleEndMeeting} disabled={meeting.endTime != null}>
                                        <FontAwesomeIcon icon={faPowerOff} size="lg" />
                                        {" "}
                                        End Meeting
                                    </button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <textarea
                                    className="h-36 w-full resize-none rounded-lg border-none bg-greyscale-200 transition-all focus:ring-2 focus:ring-accent-100"
                                    placeholder="Meeting notes"
                                    value={notes}
                                    onChange={e => setNotes(e.currentTarget.value)}
                                />
                                <div className="mt-2 flex items-center justify-between">
                                    {club.volunteering && (
                                        <span className="text-lg">
                                            Volunteering:
                                            <input
                                                type="checkbox"
                                                className="ml-2 size-6 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:cursor-pointer focus:ring-2 focus:ring-inset focus:ring-accent-200"
                                                checked={volunteering}
                                                onChange={() => setVolunteering(!volunteering)}
                                            />
                                        </span>
                                    )}
                                    <button className="relative right-0 justify-end rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-accent-200" onClick={handleSaveChanges}>
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
                            className="mb-0 ml-2 size-5 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:cursor-pointer focus:ring-2 focus:ring-inset focus:ring-accent-200"
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
