import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import Table from "../../../components/Table"
import { createMeeting } from "../../../services/CreateData"
import { useAuth } from "../../../utils/AuthContext"

function Home() {
    const { user } = useAuth()
    const [isCreatingMeeting, setIsCreatingMeeting] = useState(false)
    const navigate = useNavigate()

    if (!user)
        return

    const handleCreateMeeting = async () => {
        setIsCreatingMeeting(true)
        const meetingId = await createMeeting()
        if (meetingId) {
            navigate(`/dashboard/meeting/${meetingId}`)
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Meetings | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="absolute top-[100px] w-[996px] max-w-[90%] 2xl:w-[1400px]">
                    <div className="mx-auto mb-5 flex w-full items-center justify-between">
                        <span className="ml-2 justify-start text-2xl font-bold">Meetings</span>
                        <button
                            className="mr-2 justify-end rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-accent-200"
                            onClick={handleCreateMeeting}
                            disabled={isCreatingMeeting}
                        >
                            {isCreatingMeeting
                                ? (
                                        <svg className="size-6 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )
                                : (
                                        <>
                                            <FontAwesomeIcon icon={faPlus} size="lg" />
                                            {" "}
                                            New Meeting
                                        </>
                                    )}
                        </button>
                    </div>
                    <Table type="meetings" />
                </div>
            </div>
        </>
    )
}

export default Home
