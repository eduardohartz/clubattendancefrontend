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
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <div className="top-[100px] absolute w-[996px] 2xl:w-[1400px] max-w-[90%]">
                    <div className="flex justify-between items-center mx-auto mb-5 w-full">
                        <span className="justify-start ml-2 font-bold text-2xl">Meetings</span>
                        <button
                            className="justify-end bg-accent-100 hover:bg-accent-200 mr-2 px-[25px] py-[12px] rounded-lg text-[13.5px] transition-colors"
                            onClick={handleCreateMeeting}
                            disabled={isCreatingMeeting}
                        >
                            {isCreatingMeeting
                                ? (
                                    <svg className="text-black animate-spin size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
