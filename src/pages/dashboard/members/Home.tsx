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
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <div className="top-[100px] absolute w-[996px] 2xl:w-[1400px] max-w-[90%]">
                    <div className="flex lg:flex-row flex-col justify-between lg:items-center mx-auto mb-5 w-full">
                        <span className="justify-start mb-4 lg:mb-0 ml-2 font-bold text-2xl">Members</span>
                        <div className="flex lg:flex-row flex-col justify-end gap-3 mr-2">
                            <Link to="/dashboard/members/fields">
                                <button className="bg-greyscale-200 hover:bg-greyscale-300 px-[25px] py-[12px] rounded-lg w-[201px] lg:w-auto text-[13.5px] transition-colors">
                                    <FontAwesomeIcon icon={faFilePen} size="lg" />
                                    {" "}
                                    Edit Custom Fields
                                </button>
                            </Link>
                            <Link to="/dashboard/members/create">
                                <button className="bg-accent-100 hover:bg-accent-200 px-[25px] py-[12px] rounded-lg w-[201px] lg:w-auto text-[13.5px] transition-colors">
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
