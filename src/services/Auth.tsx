import axios from "axios";
import Cookies from "js-cookie";
import getBaseUrl from "./Api";

// TODO user type instead of any
export async function getUser() {
    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<any>(getBaseUrl() + '/auth/@me', {
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

// TODO club type instead of any
export async function getClub() {
    const token = Cookies.get('session');

    try {
        const response = await axios.get<any>(getBaseUrl() + '/club/get', {
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