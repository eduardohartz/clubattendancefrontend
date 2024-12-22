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
                <div className="flex h-screen w-full flex-col items-center justify-center">
                    <span className="mt-46 select-none font-['Galano'] text-2xl">{error}</span>
                </div>
            )
        }
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center">
                <span className="mt-46 select-none font-['Galano'] text-2xl">
                    Meeting not found
                </span>
            </div>
        )
    }

    if (data.meeting.status !== "ongoing") {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center">
                <span className="mt-46 select-none font-['Galano'] text-2xl">
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
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Attend meeting for
                        {" "}
                        {data.club.displayName}
                    </h2>
                    <h2 className="mt-1 text-center text-2xl font-bold tracking-tight text-gray-900">
                        {formatDate(data.meeting.startTime.toString())}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!register && (
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                                    Select your first name
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={memberId}
                                        onChange={e => setMemberId(e.target.value)}
                                        className="mb-5 block w-full rounded-lg border border-greyscale-200 bg-greyscale-100 py-2 transition-all hover:cursor-pointer focus:ring-accent-100"
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
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
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
                                        className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
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
                                    className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm"
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
                                className="flex w-full justify-center rounded-md bg-accent-100 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-200 disabled:cursor-not-allowed disabled:hover:bg-accent-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? (
                                            <svg
                                                className="size-5 animate-spin text-white"
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
                        <p className="mt-10 text-center text-sm text-gray-500">
                            {register ? "Already a member?" : "Aren't a member yet?"}
                            <span
                                className="cursor-pointer font-semibold text-accent-200 transition-colors hover:text-accent-100"
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
