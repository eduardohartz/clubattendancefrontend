import { Link, Navigate, useParams } from "react-router-dom";
import Table from "../../../components/Table";
import FetchData from "../../../services/FetchData";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading";

function Member({ user }: { user: any }) {

    if (!user)
        return

    const { id } = useParams<{ id: string }>();
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const data = await FetchData({ type: 'members', id });
                setMember(data);
            } catch (error) {
                console.error('Error fetching member:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!member) {
        return <Navigate to="/dashboard/members" />;
    }

    return (

        <>
            <Helmet>
                <title>Member | Club Attendance</title>
            </Helmet>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Member: {member.firstName + " " + member.lastName}</span>
                        <Link to={"/dashboard/members"}><button className="bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"><i className="fa-solid fa-arrow-left fa-lg" /> Back</button></Link>
                    </div>
                    <Table type={"attendance"} id={id} user={user} />
                </div>
            </div>
        </>
    );
}

export default Member;