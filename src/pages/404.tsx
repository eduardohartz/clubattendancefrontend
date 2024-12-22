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
            <div className="flex h-screen w-full flex-col items-center align-middle">
                <span className="mt-36 select-none font-['Galano'] text-[125px] lg:text-[250px]">
                    4
                    <span className="text-accent-100">0</span>
                    4
                </span>
                <span className="mt-46 select-none font-['Galano'] text-2xl">huh... how did you get here?</span>
                <Link to="/" className="mt-10"><span className="select-none font-['Galano'] text-2xl text-accent-100 hover:text-accent-200">Click here to go home</span></Link>
            </div>
        </>
    )
}

export default Unknown
