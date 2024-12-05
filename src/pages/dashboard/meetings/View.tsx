import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams, Navigate, Link } from "react-router-dom";
import FetchData from "../../../services/FetchData";
import { formatDate, formatTime } from "../../../utils/Formatters";
import Table from "../../../components/Table";
import Loading from "../../../components/Loading";

function Meeting({ user, club }: { user: any, club: any }) {
    if (!user || !club) return null;

    const { id } = useParams<{ id: string }>();
    const [meeting, setMeeting] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showAttendees, setShowAttendees] = useState(true);
    const [duration, setDuration] = useState<string>("");

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const data = await FetchData({ type: 'meetings', id });
                setMeeting(data);
            } catch (error) {
                setMeeting(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMeeting();
    }, [id]);

    useEffect(() => {
        if (!meeting) return;

        const updateDuration = () => {
            const now = new Date().getTime()
            const durationMs = ((meeting.endTime * 1000) || now) - (meeting.startTime * 1000);
            const durationSec = Math.floor(durationMs / 1000);
            const hours = Math.floor(durationSec / 3600);
            const minutes = Math.floor((durationSec % 3600) / 60);
            const seconds = durationSec % 60;

            const durationStr = `${hours.toString().padStart(2, "0")}h:${minutes
                .toString()
                .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`;
            setDuration(durationStr);

            if (meeting.endTime) {
                clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(updateDuration, 1000);
        updateDuration();

        return () => clearInterval(intervalId);
    }, [meeting]);

    if (loading) {
        return <Loading />;
    }

    if (!meeting) {
        return <Navigate to="/dashboard/meetings" />;
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Meeting | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] w-[80%] max-w-[1000px]">
                    <div className="mx-auto flex w-full items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Meeting {formatDate(meeting.startTime)}</span>
                        <Link to={"/dashboard/meetings"}><button className="bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"><i className="fa-solid fa-arrow-left fa-lg" /> Back</button></Link>
                    </div>
                    <div className="w-full h-[300px] bg-greyscale-100 rounded-lg outline-1 outline-greyscale-200 outline">
                        <div className="w-full px-5 flex gap-4 justify-center py-4">
                            <div className="w-1/3 bg-greyscale-200 rounded-md p-2 flex justify-center">
                                <span className="text-lg font-mono">Start Time:</span>
                                <span className="ml-2 text-lg font-mono">{formatTime(meeting.startTime)}</span>
                            </div>
                            <div className="w-1/3 bg-greyscale-200 rounded-md p-2 flex justify-center">
                                <span className="text-lg font-mono">End Time:</span>
                                <span className="ml-2 text-lg font-mono">{formatTime(meeting.endTime)}</span>
                            </div>
                            <div className="w-1/3 bg-greyscale-200 rounded-md p-2 flex justify-center">
                                <span className="text-lg font-mono">Duration:</span>
                                <span className="ml-2 text-lg font-mono">{duration}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className="text-lg">
                            Show attendees
                        </span>
                        <input
                            type="checkbox"
                            className="w-5 h-5 ml-2 mb-[0px] rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all hover:cursor-pointer"
                            checked={showAttendees}
                            onChange={() => setShowAttendees(!showAttendees)}
                        />
                    </div>
                    {showAttendees &&
                        <div className="mt-4">
                            <Table type={"attendees"} id={id} user={user} reload={2000} />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Meeting;