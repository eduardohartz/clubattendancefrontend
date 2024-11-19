import axios from "axios";
import Cookies from "js-cookie";
import getBaseUrl from "./Api";

export async function createMeeting() {
    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post<any>(getBaseUrl() + 'meetings/create', {}, {
            headers: {
                'Authorization': `${token}`,
            }
        });
        if (response.data.id) {
            return response.data.id
        } else {
            return null
        }
    } catch (error) {
        Cookies.remove('session')
        return null
    }
};