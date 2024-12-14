import axios from 'axios';
import Cookies from 'js-cookie';
import getBaseUrl from './Api';

export async function FetchData({ type, id = "" }: { type: 'meetings' | 'members' | 'attendees' | 'attendance' | 'users' | 'clubs' | 'customFields', id?: string }) {
    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    let endpoint = ""
    switch (type) {
        case "meetings":
            endpoint = "/meetings/fetch";
            break;
        case "members":
            endpoint = "/members/fetch";
            break;
        case "customFields":
            endpoint = "/members/fields/fetch";
            break;
        case "attendees":
            endpoint = "/meetings/attendees";
            break;
        case "attendance":
            endpoint = "/attendance/fetch";
            break;
        case "users": // (admin only)
            endpoint = "/admin/users/fetch";
            break;
        case "clubs": // (admin only)
            endpoint = "/admin/clubs/fetch";
            break;
        default:
            endpoint = "";
            break;
    }

    try {
        const response = await axios.get<any>(getBaseUrl() + endpoint, {
            params: {
                id: (type == 'attendance' || type == 'attendees' || type == 'members' || type == 'meetings' || type == 'customFields') ? id : undefined
            },
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch {
        return null;
    }
};

export async function fetchAttendData(code: string) {
    try {
        const response = await axios.get<any>(getBaseUrl() + "/attend/stats", {
            params: {
                code: code
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            return error.response?.data;
        return null;
    }
}