import { Helmet, HelmetProvider } from 'react-helmet-async';
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { createMeeting } from "../../../services/CreateData";
import { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home({ user }: { user: any }) {
    const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);

    if (!user)
        return

    const navigate = useNavigate();

    const handleCreateMeeting = async () => {
        setIsCreatingMeeting(true);
        const meetingId = await createMeeting();
        if (meetingId) {
            navigate("/dashboard/meeting/" + meetingId)
        }
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Meetings | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Meetings</span>
                        <button
                            className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                            onClick={handleCreateMeeting}
                            disabled={isCreatingMeeting}
                        >
                            {isCreatingMeeting ? (
                                <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} size="lg" /> New Meeting
                                </>
                            )}
                        </button>
                    </div>
                    <Table type={"meetings"} user={user} />
                </div>
            </div>
        </>
    );
}

export default Home;