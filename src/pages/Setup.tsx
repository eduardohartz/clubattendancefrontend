import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import getBaseUrl from "../services/Api"

function Setup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [clubName, setClubName] = useState("")
    const [volunteering, setVolunteering] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = () => {
            if (Cookies.get("session")) {
                navigate("/dashboard", { replace: true })
            } else {
                setLoading(false)
            }
        }

        checkSession()
    }, [navigate])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError("")

        if (password !== repeatPassword) {
            setError("Passwords do not match")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await axios.post(`${getBaseUrl()}/auth/setup`, {
                username,
                password,
                clubName,
                volunteering,
            })

            if (response.data.session) {
                Cookies.set("session", response.data.session, {
                    secure: true,
                    sameSite: "Strict",
                })
                navigate("/dashboard", { replace: true })
            } else if (response.data.errors) {
                setError(response.data.errors[0])
            }
        } catch (err) {
            if (axios.isAxiosError(err) && (err.response?.status === 403 || err.response?.status === 500)) {
                setError(err.response.data.errors[0])
            } else {
                setError("An error occurred. Please try again.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Setup | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="flex flex-col justify-center px-6 lg:px-8 py-12 min-h-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link to="/"><img className="mx-auto rounded-md w-auto h-12" src="/logo.png" alt="Club Attendance"></img></Link>
                    <h2 className="mt-10 font-bold text-2xl/9 text-center text-gray-900 tracking-tight">Setup your account</h2>
                </div>

                <div className="sm:mx-auto mt-10 sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block font-medium text-gray-900 text-sm/6">Username received on welcome email</label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="current-username"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="block border-0 shadow-xs py-1.5 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">New password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block border-0 shadow-xs py-1.5 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 transition-all"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="rpassword" className="block mt-1 font-medium text-gray-900 text-sm/6">Repeat password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="rpassword"
                                    name="rpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)}
                                    className="block border-0 shadow-xs py-1.5 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="clubname" className="block font-medium text-gray-900 text-sm/6">Club name</label>
                            <div className="mt-2">
                                <input
                                    id="clubname"
                                    name="clubname"
                                    type="text"
                                    autoComplete="organization"
                                    required
                                    value={clubName}
                                    onChange={e => setClubName(e.target.value)}
                                    className="block border-0 shadow-xs py-1.5 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <label htmlFor="volunteering" className="block font-medium text-gray-900 text-sm/6">Does your club volunteer?</label>
                                <input
                                    id="volunteering"
                                    name="volunteering"
                                    type="checkbox"
                                    checked={volunteering}
                                    onChange={e => setVolunteering(e.target.checked)}
                                    className="block border-0 shadow-xs rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset text-accent-100 transition-all size-6"
                                />
                            </div>
                        </div>

                        <div>
                            <span id="error" className="text-warningred">{error}</span>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="justify-center bg-accent-100 bg-bg-accent-100 hover:bg-accent-200 shadow-xs px-3 py-1.5 rounded-md w-full font-semibold text-sm/6 text-white transition-colors lex focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent-200"
                                disabled={isSubmitting}
                            >

                                {isSubmitting
                                    ? (
                                        <svg className="text-white animate-spin size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )
                                    : (
                                        "Setup"
                                    )}

                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-gray-500 text-sm/6">
                        Dont have a username?
                        <a href="mailto:support@clubattendance.com?subject=Requesting%20access&body=Hi!%0A%0AI%20run%20the%20club%20%5B%5D%20at%20the%20school%20%5B%5D.%20Can%20I%20request%20early%20access%20to%20your%20program%3F%0A%0AThanks!">
                            <span className="font-semibold text-accent-200 hover:text-bg-accent-100 transition-colors"> Request an account</span>
                        </a>
                    </p>
                    <p className="mt-2 text-center text-gray-500 text-sm/6">
                        Already have an account?
                        <Link to="/login"><span className="font-semibold text-accent-200 hover:text-bg-accent-100 transition-colors"> Login</span></Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Setup
