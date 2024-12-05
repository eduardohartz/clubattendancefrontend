import { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ page, user, club }: { page: string, user: any, club: any }) {

    const navigate = useNavigate()

    if (!user || !club) {
        navigate("/")
        return;
    }

    const buttonClass = "rounded-md text-left w-[170px] text-[13.5px] px-[20px] py-[14px] hover:bg-greyscale-200 transition-colors"
    const textClass = "text-left text-xl transition-colors ml-4"
    const tselected = "font-bold"
    const selected = "bg-greyscale-200"

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <link rel="stylesheet preconnect" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
                </Helmet>
            </HelmetProvider>
            <div className="hidden h-[100vh] w-[225px] bg-greyscale-100 border-r-2 border-r-greyscale-200 lg:flex flex-1 items-center flex-col">
                <img className="h-12 w-auto rounded-md mt-3" src="/logo.png" alt=""></img>
                <span className="text-2xl font-bold">Club Attendance</span>
                <span className="text-base border-b-2 border-b-greyscale-200 w-[180px] text-center py-1">{club ? club.displayName : ''}</span>

                <div className="flex flex-1 items-center flex-col gap-2 mt-[25px] mr-3">
                    <Link to={"/dashboard"}><button className={`${buttonClass} ${page == "/dashboard" ? selected : ""}`}><i className="fa-solid fa-house fa-lg mr-1"></i> Home</button></Link>
                    <Link to={"/dashboard/meetings"}><button className={`${buttonClass} ${page.includes("meeting") ? selected : ""}`}><i className="fa-solid fa-comments fa-lg mr-1"></i> Meetings</button></Link>
                    <Link to={"/dashboard/members"}><button className={`${buttonClass} ${page.includes("member") ? selected : ""}`}><i className="fa-solid fa-users fa-lg mr-1"></i> Members</button></Link>
                    <Link to={"/dashboard/settings"}><button className={`${buttonClass} ${page == "/dashboard/settings" ? selected : ""}`}><i className="fa-solid fa-cog fa-lg mr-1"></i> Club Settings</button></Link>
                    {user.admin ? <Link to={"/dashboard/admin"}><button className={`${buttonClass} ${page == "/dashboard/admin" ? selected : ""}`}><i className="fa-solid fa-user-shield fa-lg mr-1"></i> Admin</button></Link> : ""}
                    <span className="w-[180px] border-b-2 border-b-greyscale-200 mb-[40px]"></span>
                    <Link to={"/settings"}><button className={`${buttonClass} ${page == "/settings" ? selected : ""}`}><i className="fa-solid fa-user fa-lg mr-1"></i> User Settings</button></Link>
                    <Link to={"/logout"}><button className={`${buttonClass} text-warningred`}><i className="fa-solid fa-right-from-bracket fa-lg mr-1"></i> Logout</button></Link>
                </div>
            </div>
            <div onClick={toggleMenu} className="lg:hidden flex flex-1 items-center flex-col fixed top-10 left-6 hover:cursor-pointer">
                <i className="fa-solid fa-bars fa-2xl"></i>
            </div>

            <div className={`fixed inset-0 bg-greyscale-100 z-50 flex flex-col transition-transform duration-200 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div onClick={toggleMenu} className="lg:hidden flex flex-1 items-center flex-col fixed top-10 left-6 hover:cursor-pointer">
                    <i className="fa-solid fa-xmark fa-2xl"></i>
                </div>
                <div className="flex flex-col gap-4 ml-8">
                    <span className="text-4xl font-bold mt-20">Club Attendance</span>
                    <span className="text-2xl ml-2">FCCLA 2024-25</span>
                    <Link to={"/dashboard"} onClick={toggleMenu}><span className={`${textClass} ${page == "/dashboard" ? tselected : ""}`}>Home</span></Link>
                    <Link to={"/dashboard/meetings"} onClick={toggleMenu}><span className={`${textClass} ${page.includes("meeting") ? tselected : ""}`}>Meetings</span></Link>
                    <Link to={"/dashboard/members"} onClick={toggleMenu}><span className={`${textClass} ${page.includes("member") ? tselected : ""}`}>Members</span></Link>
                    <Link to={"/dashboard/settings"} onClick={toggleMenu}><span className={`${textClass} ${page == "/dashboard/settings" ? tselected : ""}`}>Club Settings</span></Link>
                    <Link to={"/settings"} onClick={toggleMenu}><span className={`${textClass} ${page == "/settings" ? tselected : ""}`}>User Settings</span></Link>
                    <Link to={"/logout"} onClick={toggleMenu}><span className={`${textClass} text-warningred`}>Logout</span></Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;