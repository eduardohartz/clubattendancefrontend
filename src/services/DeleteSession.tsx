import axios from 'axios';
import Cookies from "js-cookie";
import getBaseUrl from './Api';

// Used to log out

async function DeleteSession() {
    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<any>(getBaseUrl() + '/auth/logout', {
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data.logout;
    } catch (error) {
        return false;
    }
};

export default DeleteSession;