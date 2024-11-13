import axios from "axios";
import Cookies from "js-cookie";

export async function getUser() {
    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<any>('http://localhost:3001/auth/@me', {
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        Cookies.remove('session');
        return null;
    }
};

export async function getClub() {
    const token = Cookies.get('session');
    const user = getUser();
    if (!user) {
        Cookies.remove('session');
        return null;
    }

    try {
        const response = await axios.get<any>('http://localhost:3001/clubs/get', {
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        return null
    }
};