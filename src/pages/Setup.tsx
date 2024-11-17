import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Setup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [clubName, setClubName] = useState("");
    const [volunteering, setVolunteering] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = () => {
            if (Cookies.get('session')) {
                navigate('/dashboard', { replace: true });
            } else {
                setLoading(false);
            }
        };

        checkSession();
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3001/auth/setup', {
                username,
                password,
                clubName,
                volunteering
            });

            if (response.data.session) {
                Cookies.set('session', response.data.session, { expires: 7 });
                navigate('/dashboard', { replace: true });
            } else if (response.data.errors) {
                setError(response.data.errors[0]);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && (err.response?.status === 403 || err.response?.status === 500)) {
                setError(err.response.data.errors[0]);
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div></div>;
    }

    return (
        <>
            <Helmet>
                <title>Setup | Club Attendance</title>
            </Helmet>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link to={"/"}><img className="mx-auto h-12 rounded-md w-auto" src="/logo.png" alt="Club Attendance"></img></Link>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Setup your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username given by admin</label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="current-username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">New password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="rpassword" className="block text-sm/6 font-medium text-gray-900">Repeat password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="rpassword"
                                    name="rpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="clubname" className="block text-sm/6 font-medium text-gray-900">Club name</label>
                            <div className="mt-2">
                                <input
                                    id="clubname"
                                    name="clubname"
                                    type="text"
                                    autoComplete="organization"
                                    required
                                    value={clubName}
                                    onChange={(e) => setClubName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <label htmlFor="volunteering" className="block text-sm/6 font-medium text-gray-900">Does your club volunteer?</label>
                                <input
                                    id="volunteering"
                                    name="volunteering"
                                    type="checkbox"
                                    checked={volunteering}
                                    onChange={(e) => setVolunteering(e.target.checked)}
                                    className="block w-6 h-6 rounded-md border-0 text-accent-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <span id="error" className="text-warningred">{error}</span>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-accent-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-200 transition-colors"
                                disabled={isSubmitting}>

                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Setup"
                                )}

                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Dont have a username?
                        <a href="mailto:support@clubattendance.com?subject=Requesting%20access&body=Hi!%0A%0AI%20run%20the%20club%20%5B%5D%20at%20the%20school%20%5B%5D.%20Can%20I%20request%20early%20access%20to%20your%20program%3F%0A%0AThanks!">
                            <span className="font-semibold text-accent-200 hover:text-purple-400 transition-colors"> Request an account</span>
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Setup;