import { useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { createMember } from "../../../services/CreateData"

function Create() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)
        const id = await createMember(firstName, lastName)
        if (id) {
            navigate("/dashboard/members")
        }
        setIsSubmitting(false)
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Create Member | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="lg:usablesize top-0 right-0 absolute flex flex-col items-center gap-10 w-full h-screen">
                <h2 className="mt-28 font-bold text-3xl/9 text-center text-gray-900 tracking-tight">Create member</h2>
                <div className="sm:mx-auto mt-0 sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstname" className="block font-medium text-gray-900 text-sm/6">First name</label>
                            <div className="mt-2">
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    autoComplete="current-firstname"
                                    required
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="block border-0 shadow-xs py-1.5 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="lastname" className="block font-medium text-gray-900 text-sm/6">Last name</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    autoComplete="current-lastname"
                                    required
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="block border-0 shadow-xs py-1.5 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-accent-200 ring-inset focus:ring-inset w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Link to="/dashboard/members" className="w-3/4">
                                <button
                                    type="button"
                                    className="flex justify-center bg-greyscale-200 hover:bg-greyscale-300 shadow-xs px-3 py-1.5 rounded-md w-full font-semibold text-black text-sm/6 transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent-200"
                                    disabled={isSubmitting}
                                >
                                    Back
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="flex justify-center bg-accent-100 hover:bg-accent-200 shadow-xs px-3 py-1.5 rounded-md w-full font-semibold text-sm/6 text-white transition-colors"
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
                                        "Create"
                                    )}

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Create
