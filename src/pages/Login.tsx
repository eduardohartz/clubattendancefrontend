import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../components/Loading";
import getBaseUrl from "../services/Api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let redirect = searchParams.get("redirect");

    useEffect(() => {
        const checkSession = () => {
            if (Cookies.get('session')) {
                navigate('/dashboard');
            } else {
                setLoading(false);
            }
        };

        checkSession();
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const response = await axios.post(getBaseUrl() + '/auth/login', {
                username,
                password
            });

            if (response.data.session) {
                Cookies.set('session', response.data.session, {
                    secure: false,
                    sameSite: 'None',
                    expires: 7
                });
                if (redirect)
                    navigate(redirect);
                else
                    navigate('/dashboard');
            } else if (response.data.errors) {
                setError(response.data.errors[0]);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 403) {
                setError(err.response.data.errors[0]);
            } else {
                console.error(err);
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Log in | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link to={"/"}><img className="mx-auto h-12 rounded-md w-auto" src="/logo.png" alt="Club Attendance"></img></Link>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Log in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
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
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
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
                                    "Log in"
                                )}

                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Need to setup an account?
                        <Link to={"/setup"}><span className="font-semibold text-accent-200 hover:text-purple-400 transition-colors"> Click here</span></Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;