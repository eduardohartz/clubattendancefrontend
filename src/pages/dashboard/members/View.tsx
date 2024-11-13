import { Navigate, useParams } from "react-router-dom";
import Table from "../../../components/Table";
import FetchData from "../../../services/FetchData";
import { useState, useEffect } from "react";

function View() {
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
        return <div></div>;
    }

    if (!member) {
        return <Navigate to="/dashboard/members" />;
    }

    return (

        <>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Member: {member.firstName + " " + member.lastName}</span>
                    </div>
                    <Table type={"attendance"} id={id} />
                </div>
            </div>
        </>
    );
}

export default View;