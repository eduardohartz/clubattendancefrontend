import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <>
            <Sidebar page={location.pathname} />
            <PageTransition>
                <Outlet />
            </PageTransition>
        </>
    );
};

export default DashboardLayout;