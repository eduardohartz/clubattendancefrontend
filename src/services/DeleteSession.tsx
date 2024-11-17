import axios from 'axios';
import Cookies from "js-cookie";

//Used to log out

async function DeleteSession() {
    const token = Cookies.get('session');

    try {
        const response = await axios.get<any>('http://localhost:3001/auth/logout', {
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