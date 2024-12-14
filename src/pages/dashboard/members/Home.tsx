import type { User } from "../../../types/models"
import { faFilePen, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "react-router-dom"
import Table from "../../../components/Table"

function Home({ user }: { user: User | null }) {
    if (!user)
        return

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Members | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Members</span>
                        <div className="mr-2 justify-end flex gap-3">
                            <Link to="/dashboard/members/fields">
                                <button className="bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px]">
                                    <FontAwesomeIcon icon={faFilePen} size="lg" />
                                    {" "}
                                    Edit Custom Fields
                                </button>
                            </Link>
                            <Link to="/dashboard/members/create">
                                <button className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px]">
                                    <FontAwesomeIcon icon={faPlus} size="lg" />
                                    {" "}
                                    Add Member
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Table type="members" user={user} />
                </div>
            </div>

        </>
    )
}

export default Home
