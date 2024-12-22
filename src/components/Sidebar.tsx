import { faBars, faCog, faComments, faHouse, faRightFromBracket, faUser, faUsers, faUserShield, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"

function Sidebar({ page }: { page: string }) {
    const { user, club } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    if (!user || !club) {
        return
    }

    const buttonClass = "rounded-md text-left w-[170px] text-[13.5px] px-[20px] py-[14px] hover:bg-greyscale-200 transition-colors"
    const textClass = "text-left text-xl transition-colors ml-4"
    const tselected = "font-bold"
    const selected = "bg-greyscale-200"

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <div className="fixed hidden h-screen w-[225px] flex-1 flex-col items-center border-r-2 border-r-greyscale-200 bg-greyscale-100 lg:flex">
                <img className="mt-3 h-12 w-auto rounded-md" src="/logo.png" alt=""></img>
                <span className="text-[1.35rem] font-bold">Club Attendance</span>
                <span className="w-[180px] border-b-2 border-b-greyscale-200 py-1 text-center text-base">{club ? club.displayName : ""}</span>

                <div className="mr-3 mt-[25px] flex flex-1 flex-col items-center gap-2">
                    <Link to="/dashboard">
                        <button className={`${buttonClass} ${page === "/dashboard" ? selected : ""}`}>
                            <FontAwesomeIcon icon={faHouse} size="lg" className="mr-1" />
                            {" "}
                            Home
                        </button>
                    </Link>
                    <Link to="/dashboard/meetings">
                        <button className={`${buttonClass} ${page.includes("meeting") ? selected : ""}`}>
                            <FontAwesomeIcon icon={faComments} size="lg" className="mr-1" />
                            {" "}
                            Meetings
                        </button>
                    </Link>
                    <Link to="/dashboard/members">
                        <button className={`${buttonClass} ${page.includes("member") ? selected : ""}`}>
                            <FontAwesomeIcon icon={faUsers} size="lg" className="mr-1" />
                            {" "}
                            Members
                        </button>
                    </Link>
                    <Link to="/dashboard/settings">
                        <button className={`${buttonClass} ${page === "/dashboard/settings" ? selected : ""}`}>
                            <FontAwesomeIcon icon={faCog} size="lg" className="mr-1" />
                            {" "}
                            Club Settings
                        </button>
                    </Link>
                    {user.admin
                        ? (
                                <Link to="/dashboard/admin">
                                    <button className={`${buttonClass} ${page === "/dashboard/admin" ? selected : ""}`}>
                                        <FontAwesomeIcon icon={faUserShield} size="lg" className="mr-1" />
                                        {" "}
                                        Admin
                                    </button>
                                </Link>
                            )
                        : ""}
                    <span className="mb-[40px] w-[180px] border-b-2 border-b-greyscale-200"></span>
                    <Link to="/settings">
                        <button className={`${buttonClass} ${page === "/settings" ? selected : ""}`}>
                            <FontAwesomeIcon icon={faUser} size="lg" className="mr-1" />
                            {" "}
                            User Settings
                        </button>
                    </Link>
                    <Link to="/logout">
                        <button className={`${buttonClass} text-warningred`}>
                            <FontAwesomeIcon icon={faRightFromBracket} size="lg" className="mr-1" />
                            {" "}
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
            <div onClick={toggleMenu} className="fixed left-6 top-10 z-10 flex flex-1 flex-col items-center hover:cursor-pointer lg:hidden">
                <FontAwesomeIcon icon={faBars} size="2xl" />
            </div>

            <div className={`fixed inset-0 z-50 flex flex-col bg-greyscale-100 transition-transform duration-200 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div onClick={toggleMenu} className="fixed left-6 top-10 z-20 flex flex-1 flex-col items-center hover:cursor-pointer lg:hidden">
                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                </div>
                <div className="ml-8 flex flex-col gap-4">
                    <span className="mt-20 text-4xl font-bold">Club Attendance</span>
                    <span className="ml-2 text-2xl">{club ? club.displayName : ""}</span>
                    <Link to="/dashboard" onClick={toggleMenu}><span className={`${textClass} ${page === "/dashboard" ? tselected : ""}`}>Home</span></Link>
                    <Link to="/dashboard/meetings" onClick={toggleMenu}><span className={`${textClass} ${page.includes("meeting") ? tselected : ""}`}>Meetings</span></Link>
                    <Link to="/dashboard/members" onClick={toggleMenu}><span className={`${textClass} ${page.includes("member") ? tselected : ""}`}>Members</span></Link>
                    <Link to="/dashboard/settings" onClick={toggleMenu}><span className={`${textClass} ${page === "/dashboard/settings" ? tselected : ""}`}>Club Settings</span></Link>
                    <Link to="/settings" onClick={toggleMenu}><span className={`${textClass} ${page === "/settings" ? tselected : ""}`}>User Settings</span></Link>
                    <Link to="/logout" onClick={toggleMenu}><span className={`${textClass} text-warningred`}>Logout</span></Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar
