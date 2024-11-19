import { Helmet } from "react-helmet";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { createMeeting } from "../../../services/CreateData";

function Home({ user }: { user: any }) {

    if (!user)
        return

    const navigate = useNavigate();

    const handleCreateMeeting = async () => {
        const meetingId = await createMeeting();
        if (meetingId) {
            navigate("/dashboard/meeting/" + meetingId)
        }
    };

    return (
        <>
            <Helmet>
                <title>Meetings | Club Attendance</title>
            </Helmet>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Meetings</span>
                        <button
                            className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                            onClick={handleCreateMeeting}
                        >
                            <i className="fa-solid fa-plus fa-lg" /> New Meeting</button>
                    </div>
                    <Table type={"meetings"} user={user} />
                </div>
            </div>
        </>
    );
}

export default Home;