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
            <div className="fixed lg:flex flex-col flex-1 items-center hidden bg-greyscale-100 border-r-2 border-r-greyscale-200 w-[225px] h-screen">
                <img className="mt-3 rounded-md w-auto h-12" src="/logo.png" alt=""></img>
                <span className="font-bold text-[1.35rem]">Club Attendance</span>
                <span className="py-1 border-b-2 border-b-greyscale-200 w-[180px] text-base text-center">{club ? club.displayName : ""}</span>

                <div className="flex flex-col flex-1 items-center gap-2 mt-[25px] mr-3">
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
                    <span className="mb-[40px] border-b-2 border-b-greyscale-200 w-[180px]"></span>
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
            <div onClick={toggleMenu} className="top-10 left-6 z-10 fixed flex flex-col flex-1 items-center lg:hidden hover:cursor-pointer">
                <FontAwesomeIcon icon={faBars} size="2xl" />
            </div>

            <div className={`fixed inset-0 z-50 flex flex-col bg-greyscale-100 transition-transform duration-200 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div onClick={toggleMenu} className="top-10 left-6 z-20 fixed flex flex-col flex-1 items-center lg:hidden hover:cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                </div>
                <div className="flex flex-col gap-4 ml-8">
                    <span className="mt-20 font-bold text-4xl">Club Attendance</span>
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
