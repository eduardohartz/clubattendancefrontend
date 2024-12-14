import type { Club, User } from "../../../types/models"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, Navigate, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import Table from "../../../components/Table"
import { FetchData } from "../../../services/FetchData"

function Member({ user, club }: { user: User | null, club: Club | null }) {

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
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">
                            Attendance for:
                            {" "}
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
                    <Table type="attendance" id={id} user={user} club={club} />
                </div>
            </div>
        </>
    )
}

export default Member
