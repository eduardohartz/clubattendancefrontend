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
                <nav className="mx-auto flex max-w-[90%] items-center justify-between p-6 lg:px-1" aria-label="Global">
                    <div className="hidden lg:flex">
                        <div className="flex h-16 w-56 flex-row items-center rounded-lg bg-gray-100">
                            <a href="#" className="">
                                <img className="ml-3 h-12 w-auto rounded-md" src="/logo.png" alt=""></img>
                            </a>
                            <a href="#" className="">
                                <span className="text-md ml-3.5">Club Attendance</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex lg:hidden">
                        <a href="#" className="">
                            <img className="ml-3 h-12 w-auto rounded-md" src="/logo.png" alt=""></img>
                        </a>
                    </div>
                    <div className="flex gap-3 lg:justify-end lg:gap-4">
                        <Link to="/setup" className="self-center text-[14px] font-semibold text-accent-100 transition-colors hover:text-accent-200">
                            Setup account
                        </Link>
                        <Link to="/login">
                            <button className="rounded-lg bg-accent-100 px-7 py-3 text-sm/6 font-semibold text-white transition-colors hover:bg-accent-200">
                                Log in
                                {" "}
                                <span aria-hidden="true">&rarr;</span>
                            </button>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="mt-40 flex flex-1 flex-col items-center justify-center gap-10">
                <span className="mr-2 font-['Galano'] text-5xl max-lg:ml-10 lg:mr-0 lg:text-7xl">Club Attendance</span>
                <span className="font-['Galano'] text-3xl max-lg:ml-16">
                    The
                    {" "}
                    <span id="change" className={`change text-accent-200 ${isUp ? "up" : ""}`}>{currentText}</span>
                    {" "}
                    club attendance tracker
                </span>
                <a href="mailto:support@clubattendance.com?subject=Requesting%20access&body=Hi!%0A%0AI%20run%20the%20club%20%5B%5D%20at%20the%20school%20%5B%5D.%20Can%20I%20request%20early%20access%20to%20your%20program%3F%0A%0AThanks!">
                    <button className="rounded-lg bg-accent-100 px-7 py-3 text-sm/6 font-semibold text-white transition-colors hover:bg-accent-200">Request Access</button>
                </a>
            </div>

            <div className="absolute top-[90vh] flex w-screen flex-1 flex-col items-center justify-center gap-2 hover:cursor-pointer" onClick={scroll}>
                <span className="font-bold">Learn more</span>
                <span aria-hidden="true" className="animate-inout text-xl">&#x25BC;</span>
            </div>

            <div ref={infoRef} className="relative left-1/2 top-[380px] mb-10 flex min-h-max w-4/5 max-w-[750px] -translate-x-1/2 transform flex-col items-center justify-center gap-12">
                <div className="flex w-full flex-col gap-5">
                    <span className="font-['Galano'] text-4xl">About</span>
                    <span className="text-xl">
                        Club Attendance is a club attendance tracker that allows you to easily track attendance and voluntering hours for your club meetings.
                        {false ? "It is made by a student attending Issaquah High School!" : ""}
                        {" "}
                        If you need assistance, email support@clubattendance.com.
                    </span>
                </div>
                <div className="flex w-full flex-col gap-5">
                    <span className="font-['Galano'] text-4xl">Features</span>
                    <span className="text-xl">Club Attendance has many features that make it the best club attendance tracker available. Send feature suggestions to suggestions@clubattendance.com</span>
                    <ul className="ml-8 list-disc text-xl">
                        <li>Member hour tracking</li>
                        <li>Voluntering tracking</li>
                        <li>Export to Excel, Word, and PDF (ASB Friendly!!)</li>
                        <li>Import from Excel and API's (soon)</li>
                        <li>+ More coming soon!</li>
                    </ul>
                </div>
                <div className="flex w-full flex-col gap-5">
                    <span className="font-['Galano'] text-4xl">Pricing</span>
                    <span className="text-xl">Club Attendance is free to use for all clubs! Request access above.</span>
                </div>
            </div>
            <div className="relative h-[450px]"></div>
        </>
    )
}

export default Landing
