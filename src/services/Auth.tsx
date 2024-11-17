import axios from "axios";
import Cookies from "js-cookie";

//todo user type instead of any
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
        if (!response.data.id) {
            Cookies.remove('session')
            return null
        }
        return response.data;
    } catch (error) {
        Cookies.remove('session')
        return null
    }
};

//todo club type instead of any
export async function getClub() {
    const token = Cookies.get('session');
    const user = getUser();
    if (!user) {
        Cookies.remove('session')
        return null
    }

    try {
        const response = await axios.get<any>('http://localhost:3001/club/get', {
            headers: {
                'Authorization': `${token}`
            }
        });
        if (!response.data.id) {
            Cookies.remove('session')
            return null
        }
        return response.data;
    } catch (error) {
        Cookies.remove('session')
        return null
    }
};