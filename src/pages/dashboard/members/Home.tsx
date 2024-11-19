import { Link } from "react-router-dom";
import Table from "../../../components/Table";
import { Helmet } from "react-helmet";

function Home({ user }: { user: any }) {

    if (!user)
        return

    return (
        <>
            <Helmet>
                <title>Members | Club Attendance</title>
            </Helmet>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Members</span>
                        <Link to={"/dashboard/members/create"}><button className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"><i className="fa-solid fa-plus fa-lg" /> Add Member</button></Link>
                    </div>
                    <Table type={"members"} user={user} />
                </div>
            </div>
        </>
    );
}

export default Home;