import { faFilePen, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "react-router-dom"
import Table from "../../../components/Table"
import { useAuth } from "../../../utils/AuthContext"

function Home() {
    const { user, club } = useAuth()
    if (!user || !club)
        return

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Members | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="absolute top-[100px] w-[996px] max-w-[90%] 2xl:w-[1400px]">
                    <div className="mx-auto mb-5 flex w-full flex-col justify-between lg:flex-row lg:items-center">
                        <span className="mb-4 ml-2 justify-start text-2xl font-bold lg:mb-0">Members</span>
                        <div className="mr-2 flex flex-col justify-end gap-3 lg:flex-row">
                            <Link to="/dashboard/members/fields">
                                <button className="w-[201px] rounded-lg bg-greyscale-200 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-greyscale-300 lg:w-auto">
                                    <FontAwesomeIcon icon={faFilePen} size="lg" />
                                    {" "}
                                    Edit Custom Fields
                                </button>
                            </Link>
                            <Link to="/dashboard/members/create">
                                <button className="w-[201px] rounded-lg bg-accent-100 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-accent-200 lg:w-auto">
                                    <FontAwesomeIcon icon={faPlus} size="lg" />
                                    {" "}
                                    Add Member
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Table type="members" />
                </div>
            </div>

        </>
    )
}

export default Home
