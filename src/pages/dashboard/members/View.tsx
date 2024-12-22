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
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center gap-10">
                <div className="absolute top-[100px] w-[996px] max-w-[90%] 2xl:w-[1400px]">
                    <div className="mx-auto mb-5 flex w-full items-center justify-between">
                        <span className="ml-2 justify-start text-2xl font-bold">
                            {`${member.firstName} ${member.lastName}`}
                        </span>
                        <Link to="/dashboard/members">
                            <button className="mr-2 justify-end rounded-lg bg-greyscale-200 px-[25px] py-[12px] text-[13.5px] transition-colors hover:bg-greyscale-300">
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                {" "}
                                Back
                            </button>
                        </Link>
                    </div>
                    <div className="mb-5 h-[300px] w-full rounded-lg bg-greyscale-100 outline outline-1 outline-greyscale-200">
                        <div className="grid w-full grid-cols-1 justify-center gap-4 px-5 py-4 md:grid-cols-3">

                        </div>
                        <div className="flex w-full justify-center gap-4 px-5 py-1">
                            <div className="w-1/2">

                            </div>
                            <div className="w-1/2">

                            </div>
                        </div>
                    </div>
                    <span className="ml-2 justify-start text-xl font-bold">
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
