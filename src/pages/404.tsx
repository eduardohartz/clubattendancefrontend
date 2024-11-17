import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Unknown() {

    return (
        <>
            <Helmet>
                <title>Page Not Found | Club Attendance</title>
            </Helmet>
            <div className="w-full h-screen flex align-middle items-center flex-col">
                <span className="text-[125px] mt-36 font-['Galano'] select-none lg:text-[250px]">4<span className="text-accent-100">0</span>4</span>
                <span className="text-2xl mt-46 font-['Galano'] select-none">huh... how did you get here?</span>
                <Link to={"/"} className="mt-10"><span className="text-2xl font-['Galano'] text-accent-100 select-none hover:text-accent-200">Click here to go home</span></Link>
            </div>
        </>
    );
}

export default Unknown;