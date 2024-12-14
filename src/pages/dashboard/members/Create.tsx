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
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <h2 className="mt-28 text-center text-3xl/9 font-bold tracking-tight text-gray-900">Create member</h2>
                <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstname" className="block text-sm/6 font-medium text-gray-900">First name</label>
                            <div className="mt-2">
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    autoComplete="current-firstname"
                                    required
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="lastname" className="block text-sm/6 font-medium text-gray-900">Last name</label>
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-200 sm:text-sm/6 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Link to="/dashboard/members" className="w-[75%]">
                                <button
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-greyscale-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-sm hover:bg-greyscale-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-200 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Back
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-accent-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-200 transition-colors"
                                disabled={isSubmitting}
                            >

                                {isSubmitting
                                    ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
