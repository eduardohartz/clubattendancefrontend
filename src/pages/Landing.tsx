import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lenis from 'lenis';

function Landing() {

    const [currentText, setCurrentText] = useState("easiest");
    const [index, setIndex] = useState(0);
    const [isUp, setIsUp] = useState(false);
    const infoRef = useRef<HTMLDivElement>(null);

    const lenis = new Lenis({
        autoRaf: true,
    });

    const scroll = async () => {
        lenis.scrollTo((infoRef.current || 0), {
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 3)
        });
    }

    useEffect(() => {
        const texts = ['simplest', 'smoothest', 'no-cost', 'optimized', 'fastest'];

        const changeText = () => {
            setIsUp(true);

            setTimeout(() => {
                setCurrentText(texts[index]);
                setIndex((prevIndex) => (prevIndex + 1) % texts.length);
                setIsUp(false);
            }, 500);
        };

        const interval = setInterval(changeText, 2000);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-1" aria-label="Global">
                    <div className="lg:flex lg:flex-1 hidden">
                        <div className="w-56 h-16 rounded-lg bg-gray-100 flex flex-row items-center">
                            <a href="#" className="">
                                <img className="h-12 w-auto rounded-md ml-3" src="/logo.png" alt=""></img>
                            </a>
                            <a href="#" className="">
                                <span className="ml-3.5 text-md">Club Attendance</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex lg:flex-1 lg:hidden">
                        <a href="#" className="">
                            <img className="h-12 w-auto rounded-md ml-3" src="/logo.png" alt=""></img>
                        </a>
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                        <Link to={"/login"}><button className="text-sm/6 font-semibold text-white bg-purple-400 px-7 py-3 rounded-lg hover:bg-accent-200 transition-colors">Log in <span aria-hidden="true">&rarr;</span></button></Link>
                    </div>
                </nav>
            </header>

            <div className="flex flex-1 items-center justify-center mt-40 flex-col gap-10">
                <span className="text-5xl max-lg:ml-5 lg:text-7xl font-['Galano']">Club Attendance</span>
                <span className="text-3xl max-lg:ml-2 max-lg:text-left font-['Galano']">The <span id="change" className={`text-accent-200 change ${isUp ? 'up' : ''}`}>{currentText}</span> club attendance tracker</span>
                <a href="mailto:support@clubattendance.com?subject=Requesting%20access&body=Hi!%0A%0AI%20run%20the%20club%20%5B%5D%20at%20the%20school%20%5B%5D.%20Can%20I%20request%20early%20access%20to%20your%20program%3F%0A%0AThanks!">
                    <button className="text-sm/6 font-semibold text-white bg-purple-400 px-7 py-3 rounded-lg hover:bg-accent-200 transition-colors">Request Access</button>
                </a>
            </div>

            <div className="flex flex-1 items-center justify-center flex-col gap-2 w-screen absolute top-[90vh] hover:cursor-pointer" onClick={scroll}>
                <span className="font-bold">Learn more</span>
                <span aria-hidden="true" className="text-xl animate-inout">&#x25BC;</span>
            </div>

            <div ref={infoRef} className="relative w-[80%] max-w-[750px] flex flex-col items-center justify-center min-h-max gap-12 top-[380px] mb-10 left-[50%] transform translate-x-[-50%]">
                <div className="flex flex-col w-[100%] gap-5">
                    <span className="text-4xl font-['Galano']">About</span>
                    <span className="text-xl">Club Attendance is a club attendance tracker that allows you to easily track attendance and voluntering hours for your club meetings. It is made by a student attending Issaquah High School! If you need assistance, email support@clubattendance.com.</span>
                </div>
                <div className="flex flex-col w-[100%] gap-5">
                    <span className="text-4xl font-['Galano']">Features</span>
                    <span className="text-xl">Club Attendance has many features that make it the best club attendance tracker available. Send feature suggestions to suggestions@clubattendance.com</span>
                    <ul className="text-xl list-disc ml-8">
                        <li>Member hour tracking</li>
                        <li>Voluntering tracking</li>
                        <li>Export to Excel, Word, and PDF (ASB Friendly!!)</li>
                        <li>Import from Excel and API's (soon)</li>
                        <li>+ More coming soon!</li>
                    </ul>
                </div>
                <div className="flex flex-col w-[100%] gap-5">
                    <span className="text-4xl font-['Galano']">Pricing</span>
                    <span className="text-xl">Club Attendance is free to use for all clubs! Request access above.</span>
                </div>
            </div>
            <div className="relative h-[450px]"></div>
        </>
    );
}

export default Landing;