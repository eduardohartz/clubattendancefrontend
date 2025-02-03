import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useNavigate, useSearchParams } from "react-router-dom"
import Loading from "../components/Loading"
import PageText from "../components/PageText"
import { attendMeeting } from "../services/CreateData"
import { fetchAttendData } from "../services/FetchData"
import { formatDate } from "../utils/Formatters"

interface ClubData {
    club: {
        displayName: string
        useStaticCode: boolean
        allowSelfRegistration: boolean
    }
    meeting: {
        startTime: number
        status: string
    }
    members: {
        externalId: string
        firstName: string
    }[]
}

function Attend() {
    const [data, setData] = useState<ClubData | null>(null)
    const [memberId, setMemberId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [register, setRegister] = useState(false)
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [cookieError, setCookieError] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [code, setCode] = useState<string | null>(searchParams.get("code"))
    const success = searchParams.get("success")

    useEffect(() => {
        const checkSession = () => {
            if (code && Cookies.get(code) === "true") {
                setCode(null)
                setCookieError(true)
            }
        }

        checkSession()
    }, [code])

    useEffect(() => {
        const fetchStats = async () => {
            if (!code) {
                setLoading(false)
                return
            }
            try {
                const fetchedData = await fetchAttendData(code)
                if (fetchedData.errors) {
                    setError(fetchedData.errors[0])
                    return
                }
                setData(fetchedData)
            } catch {
                setError("Error fetching data, please try again later")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [code])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)

        if (!register) {
            if (!memberId || !lastName) {
                setError("Please select your first name and enter your last name")
                setIsSubmitting(false)
                return
            }
        } else {
            if (!firstName || !lastName) {
                setError("Please enter your first and last name")
                setIsSubmitting(false)
                return
            }
        }

        const result = await attendMeeting(code!, memberId, lastName, register, firstName)
        setIsSubmitting(false)
        if (result === true) {
            Cookies.set(code!, "true", {
                secure: true,
                sameSite: "Strict",
                expires: 1,
            })
            navigate("/attend?success=true")
        } else {
            setError(result)
        }
    }

    if (cookieError) {
        return <PageText text="You have already attended this meeting!" sidebar={false} />
    }

    if (!code && !success) {
        return <PageText text="Meeting not found" sidebar={false} />
    }

    if (loading) {
        return <Loading />
    }

    if (success === "true") {
        return <PageText text="You have successfully attended this meeting!" sidebar={false} />
    }

    if (!data) {
        if (error) {
            return (
                <div className="flex flex-col justify-center items-center w-full h-screen">
                    <span className="mt-46 font-['Galano'] text-2xl select-none">{error}</span>
                </div>
            )
        }
        return (
            <div className="flex flex-col justify-center items-center w-full h-screen">
                <span className="mt-46 font-['Galano'] text-2xl select-none">
                    Meeting not found
                </span>
            </div>
        )
    }

    if (data.meeting.status !== "ongoing") {
        return (
            <div className="flex flex-col justify-center items-center w-full h-screen">
                <span className="mt-46 font-['Galano'] text-2xl select-none">
                    Meeting not active
                </span>
            </div>
        )
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Attend Meeting | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="flex flex-col justify-center px-6 lg:px-8 py-12 min-h-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 font-bold text-2xl text-center text-gray-900 tracking-tight">
                        Attend meeting for
                        {" "}
                        {data.club.displayName}
                    </h2>
                    <h2 className="mt-1 font-bold text-2xl text-center text-gray-900 tracking-tight">
                        {formatDate(data.meeting.startTime.toString())}
                    </h2>
                </div>

                <div className="sm:mx-auto mt-10 sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!register && (
                            <div>
                                <label htmlFor="firstName" className="block font-medium text-gray-900 text-sm">
                                    Select your first name
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={memberId}
                                        onChange={e => setMemberId(e.target.value)}
                                        className="block border-greyscale-200 bg-greyscale-100 mb-5 py-2 border rounded-lg focus:ring-accent-100 w-full transition-all hover:cursor-pointer"
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {data.members.map(member => (
                                            <option key={member.externalId} value={member.externalId}>
                                                {member.firstName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {register && (
                            <div>
                                <label htmlFor="firstName" className="block font-medium text-gray-900 text-sm">
                                    Register: Type in your first name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="block shadow-xs py-2 border-none rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 sm:text-sm transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="lastName" className="block font-medium text-gray-900 text-sm">
                                Type in your last name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="block shadow-xs py-2 border-none rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <span id="error" className="block w-full text-center text-warningred">
                                {error}
                            </span>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex justify-center focus:outline-hidden bg-accent-100 hover:bg-accent-200 disabled:hover:bg-accent-100 shadow-xs px-3 py-1.5 rounded-md focus:ring-2 focus:ring-accent-200 focus:ring-inset w-full font-semibold text-sm text-white transition-colors disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? (
                                        <svg
                                            className="text-white animate-spin size-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            >
                                            </circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            >
                                            </path>
                                        </svg>
                                    )
                                    : register
                                        ? (
                                            "Register and attend"
                                        )
                                        : (
                                            "Attend"
                                        )}
                            </button>
                        </div>
                    </form>

                    {data.club.allowSelfRegistration && (
                        <p className="mt-10 text-center text-gray-500 text-sm">
                            {register ? "Already a member?" : "Aren't a member yet?"}
                            <span
                                className="font-semibold text-accent-200 hover:text-accent-100 transition-colors cursor-pointer"
                                onClick={() => setRegister(!register)}
                            >
                                {" "}
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Attend
