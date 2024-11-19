import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ path, element, user, club }: { path: string, element: JSX.Element, user: any, club: any }) {
    const navigate = useNavigate();
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login?redirect=" + path);
            setShouldRender(false);
        } else if (user.status === false) {
            alert("Your account has been disabled. Please contact an administrator.");
            navigate("/");
            setShouldRender(false);
        } else if (path.includes("admin") && !user.admin) {
            alert("You do not have permission to access this page.");
            navigate("/dashboard");
            setShouldRender(false);
        } else if (!club && path !== "/settings" && path !== "/dashboard/admin") {
            navigate("/login?redirect=" + path);
            setShouldRender(false);
        } else if (club.status === false && path !== "/settings" && path !== "/dashboard/admin") {
            alert("Your club has been disabled. Please contact an administrator.");
            navigate("/settings");
            setShouldRender(false);
        } else {
            setShouldRender(true);
        }
    }, [user, club, path, navigate]);

    if (!shouldRender) {
        return null;
    }

    return element;
}

export default ProtectedRoute;