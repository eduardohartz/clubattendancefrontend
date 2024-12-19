import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, Navigate, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import Table from "../../../components/Table"
import { FetchData } from "../../../services/FetchData"
import { useAuth } from "../../../utils/AuthContext"

function Member() {
    const { user, club } = useAuth()
    const { id } = useParams<{ id: string }>()
    const [member, setMember] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const data = await FetchData({ type: "members", id })
                setMember(data)
            } catch {
                setMember(null)
            } finally {
                setLoading(false)
            }
        }

        fetchMember()
    }, [id])

    if (!user || !club)
        return

    if (loading) {
        return <Loading />
    }

    if (!member) {
        return <Navigate to="/dashboard/members" />
    }

    return (

        <>
            <HelmetProvider>
                <Helmet>
                    <title>Member | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize w-full h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] max-w-[90%] w-[996px] 2xl:w-[1400px]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">
                            {`${member.firstName} ${member.lastName}`}
                        </span>
                        <Link to="/dashboard/members">
                            <button className="bg-greyscale-200 hover:bg-greyscale-300 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                {" "}
                                Back
                            </button>
                        </Link>
                    </div>
                    <div className="w-full h-[300px] bg-greyscale-100 rounded-lg outline-1 outline-greyscale-200 outline mb-5">
                        <div className="w-full px-5 grid grid-cols-1 md:grid-cols-3 gap-4 justify-center py-4">

                        </div>
                        <div className="w-full px-5 flex gap-4 justify-center py-1">
                            <div className="w-1/2">

                            </div>
                            <div className="w-1/2">

                            </div>
                        </div>
                    </div>
                    <span className="justify-start text-xl font-bold ml-2">
                        Attendance history
                    </span>
                    <div className="mt-3">
                        <Table type="attendance" id={id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Member
