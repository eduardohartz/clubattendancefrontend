import axios from 'axios';
import Cookies from 'js-cookie';
import getBaseUrl from './Api';

// TODO change member from type any
// interface Member {
//   id: number;
//   name: string;
//   role: string;
//   email: string;
// }

// Fetch all data based on type, mostly for Table

async function FetchData({ type, id = "" }: { type: 'meetings' | 'members' | 'attendees' | 'attendance' | 'users' | 'clubs', id?: string }) {
    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    let endpoint = ""
    if (type == "meetings")
        endpoint = "/meetings/fetch";
    else if (type == "members")
        endpoint = "/members/fetch";
    else if (type == "attendees")
        endpoint = "/meetings/attendees";
    else if (type == "attendance")
        endpoint = "/attendance/fetch";
    else if (type == "users") // (admin only)
        endpoint = "/admin/users/fetch";
    else if (type == "clubs") // (admin only)
        endpoint = "/admin/clubs/fetch";

    try {
        const response = await axios.get<any>(getBaseUrl() + endpoint, {
            params: {
                id: (type == 'attendance' || type == 'attendees' || type == 'members' || type == 'meetings') ? id : undefined
            },
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default FetchData;