import Lenis from "lenis"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

function Landing() {

    const [currentText, setCurrentText] = useState("easiest")
    const [index, setIndex] = useState(0)
    const [isUp, setIsUp] = useState(false)
    const infoRef = useRef<HTMLDivElement>(null)

    const lenis = new Lenis({
        autoRaf: true,
    })

    const scroll = async () => {
        lenis.scrollTo((infoRef.current || 0), {
            duration: 2,
            easing: t => 1 - (1 - t) ** 3,
        })
    }

    useEffect(() => {
        const texts = ["simplest", "smoothest", "no-cost", "optimized", "fastest"]

        const changeText = () => {
            setIsUp(true)

            setTimeout(() => {
                setCurrentText(texts[index])
                setIndex(prevIndex => (prevIndex + 1) % texts.length)
                setIsUp(false)
            }, 500)
        }

        const interval = setInterval(changeText, 2000)

        return () => clearInterval(interval)
    }, [index])

    return (
        <>
            <header className="bg-white">
                <nav className="flex justify-between items-center mx-auto lg:px-1 p-6 max-w-[90%]" aria-label="Global">
                    <div className="lg:flex hidden">
                        <div className="flex flex-row items-center bg-gray-100 rounded-lg w-56 h-16">
                            <a href="#" className="">
                                <img className="ml-3 rounded-md w-auto h-12" src="/logo.png" alt=""></img>
                            </a>
                            <a href="#" className="">
                                <span className="ml-3.5 text-md">Club Attendance</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex lg:hidden">
                        <a href="#" className="">
                            <img className="ml-3 rounded-md w-auto h-12" src="/logo.png" alt=""></img>
                        </a>
                    </div>
                    <div className="flex lg:justify-end gap-3 lg:gap-4">
                        <Link to="/setup" className="font-semibold text-[14px] text-accent-100 hover:text-accent-200 transition-colors self-center">
                            Setup account
                        </Link>
                        <Link to="/login">
                            <button className="bg-accent-100 hover:bg-accent-200 px-7 py-3 rounded-lg font-semibold text-sm/6 text-white transition-colors">
                                Log in
                                {" "}
                                <span aria-hidden="true">&rarr;</span>
                            </button>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="flex flex-col flex-1 justify-center items-center gap-10 mt-40">
                <span className="mr-2 lg:mr-0 max-lg:ml-10 font-['Galano'] text-5xl lg:text-7xl">Club Attendance</span>
                <span className="max-lg:ml-16 font-['Galano'] text-3xl">
                    The
                    {" "}
                    <span id="change" className={`change text-accent-200 ${isUp ? "up" : ""}`}>{currentText}</span>
                    {" "}
                    club attendance tracker
                </span>
                <a href="mailto:support@clubattendance.com?subject=Requesting%20access&body=Hi!%0A%0AI%20run%20the%20club%20%5B%5D%20at%20the%20school%20%5B%5D.%20Can%20I%20request%20early%20access%20to%20your%20program%3F%0A%0AThanks!">
                    <button className="bg-accent-100 hover:bg-accent-200 px-7 py-3 rounded-lg font-semibold text-sm/6 text-white transition-colors">Request Access</button>
                </a>
            </div>

            <div className="top-[90vh] absolute flex flex-col flex-1 justify-center items-center gap-2 w-screen hover:cursor-pointer" onClick={scroll}>
                <span className="font-bold">Learn more</span>
                <span aria-hidden="true" className="text-xl animate-inOut">&#x25BC;</span>
            </div>

            <div ref={infoRef} className="relative top-[380px] left-1/2 flex flex-col justify-center items-center gap-12 mb-10 w-4/5 max-w-[750px] min-h-max transform -translate-x-1/2">
                <div className="flex flex-col gap-5 w-full">
                    <span className="font-['Galano'] text-4xl">About</span>
                    <span className="text-xl">
                        Club Attendance is a club attendance tracker that allows you to easily track attendance and voluntering hours for your club meetings.
                        {false ? "It is made by a student attending Issaquah High School!" : ""}
                        {" "}
                        If you need assistance, email support@clubattendance.com.
                    </span>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <span className="font-['Galano'] text-4xl">Features</span>
                    <span className="text-xl">Club Attendance has many features that make it the best club attendance tracker available. Send feature suggestions to suggestions@clubattendance.com</span>
                    <ul className="ml-8 text-xl list-disc">
                        <li>Member hour tracking</li>
                        <li>Voluntering tracking</li>
                        <li>Export to Excel, Word, and PDF (ASB Friendly!!)</li>
                        <li>Import from Excel and API's (soon)</li>
                        <li>+ More coming soon!</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <span className="font-['Galano'] text-4xl">Pricing</span>
                    <span className="text-xl">Club Attendance is free to use for all clubs! Request access above.</span>
                </div>
            </div>
            <div className="relative h-[450px]"></div>
        </>
    )
}

export default Landing
