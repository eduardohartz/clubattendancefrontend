import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "react-router-dom"

function Unknown() {

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Page Not Found | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="flex flex-col items-center w-full h-screen align-middle">
                <span className="mt-36 font-['Galano'] text-[125px] lg:text-[250px] select-none">
                    4
                    <span className="text-accent-100">0</span>
                    4
                </span>
                <span className="mt-46 font-['Galano'] text-2xl select-none">huh... how did you get here?</span>
                <Link to="/" className="mt-10"><span className="font-['Galano'] text-2xl text-accent-100 hover:text-accent-200 select-none">Click here to go home</span></Link>
            </div>
        </>
    )
}

export default Unknown
