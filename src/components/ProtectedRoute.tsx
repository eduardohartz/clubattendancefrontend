import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getClub, getUser } from '../services/Auth';

const ProtectedRoute = ({ path, element }: { path: string, element: JSX.Element }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [club, setClub] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();
            const club = await getClub();
            setUser(user);
            setClub(club);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return;
    }

    //User checks

    if (!user) {
        return <Navigate to={"/login?redirect=" + path} />;
    }

    if (user.status == false) {
        alert("Your account has been disabled. Please contact an administrator.");
        navigate("/");
        return (<></>);
    }

    if (path.includes("admin") && !user.admin) {
        alert("You do not have permission to access this page.");
        navigate("/dashboard");
        return <Navigate to={"/dashboard"} />;
    }

    //Club checks

    if (!club) {
        alert("There is a problem with your account! Please contact support.");
        return <Navigate to={"/"} />;
    }

    if (club.status == false) {
        alert("Your club has been disabled. Please contact an administrator.")
        navigate("/");
        return (<></>);
    }

    return element;
};

export default ProtectedRoute;