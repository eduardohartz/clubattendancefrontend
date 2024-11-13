import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DeleteSession from '../services/DeleteSession';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            let logout = await DeleteSession();

            if (logout) {
                Cookies.remove('session'); 
            }
            navigate('/');
        };

        performLogout();
    }, [navigate]);

    return (
        <div>
        </div>
    );
}

export default Logout;