import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAttendData } from '../services/FetchData';
import Loading from '../components/Loading';
import { formatDate } from '../utils/Formatters';
import { attendMeeting } from '../services/CreateData';
import Cookies from 'js-cookie';

interface ClubData {
    club: {
        displayName: string;
        useStaticCode: boolean;
        allowSelfRegistration: boolean;
    };
    meeting: {
        startTime: number;
        status: string;
    };
    members: {
        externalId: string;
        firstName: string;
    }[];
}

function Attend() {
    const [data, setData] = useState<ClubData | null>(null);
    const [memberId, setMemberId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [register, setRegister] = useState(false);
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cookieError, setCookieError] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [code, setCode] = useState<string | null>(searchParams.get("code"));
    const success = searchParams.get("success");

    useEffect(() => {
        const checkSession = () => {
            if (code && Cookies.get(code) === "true") {
                setCode(null);
                setCookieError(true)
            }
        };

        checkSession();
    }, [code]);

    useEffect(() => {
        const fetchStats = async () => {
            if (!code) {
                setLoading(false);
                return;
            }
            try {
                const fetchedData = await fetchAttendData(code);
                if (fetchedData.errors) {
                    setError(fetchedData.errors[0]);
                    return;
                }
                setData(fetchedData);
            } catch (error) {
                setError("Error fetching data, please try again later");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [code]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!register) {
            if (!memberId || !lastName) {
                setError("Please select your first name and enter your last name");
                setIsSubmitting(false);
                return;
            }
        } else {
            if (!firstName || !lastName) {
                setError("Please enter your first and last name");
                setIsSubmitting(false);
                return;
            }
        }

        const result = await attendMeeting(code!, memberId, lastName, register, firstName);
        setIsSubmitting(false);
        if (result === true) {
            Cookies.set(code!, "true", {
                secure: true,
                sameSite: 'Strict',
                expires: 1,
            });
            navigate("/attend?success=true");
        } else {
            setError(result);
        }
    };

    if (cookieError) {
        return (
            <div className="w-full h-screen flex align-middle items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">You have already attended this meeting!</span>
            </div>
        );
    }

    if (!code && !success) {
        return (
            <div className="w-full h-screen flex align-middle items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">Meeting not found</span>
            </div>
        );
    }

    if (loading) {
        return <Loading />;
    }

    if (success === "true") {
        return (
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">
                    You have successfully attended this meeting
                </span>
            </div>
        );
    }

    if (!data) {
        if (error) {
            return (
                <div className="w-full h-screen flex items-center justify-center flex-col">
                    <span className="text-2xl mt-46 font-['Galano'] select-none">{error}</span>
                </div>
            );
        }
        return (
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">
                    Meeting not found
                </span>
            </div>
        );
    }

    if (data.meeting.status !== "ongoing") {
        return (
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">
                    Meeting not active
                </span>
            </div>
        );
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
                        Attend meeting for {data.club.displayName}
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
                                        onChange={(e) => setMemberId(e.target.value)}
                                        className="border block py-2 w-full mb-5 border-greyscale-200 bg-greyscale-100 rounded-lg transition-all focus:ring-accent-100 hover:cursor-pointer"
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {data.members.map((member) => (
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
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="block w-full border-none rounded-md py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm transition-all"
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
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="block w-full border-none rounded-md py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <span id="error" className="text-warningred block w-full text-center">
                                {error}
                            </span>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-accent-100 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-200 transition-colors disabled:cursor-not-allowed disabled:hover:bg-accent-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
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
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : register ? (
                                    "Register and attend"
                                ) : (
                                    "Attend"
                                )}
                            </button>
                        </div>
                    </form>

                    {data.club.allowSelfRegistration && (
                        <p className="mt-10 text-center text-sm text-gray-500">
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
    );
}

export default Attend;