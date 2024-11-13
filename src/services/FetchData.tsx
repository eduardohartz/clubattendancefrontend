// src/services/memberService.ts
import axios from 'axios';
import Cookies from 'js-cookie';

// interface Member {
//   id: number;
//   name: string;
//   role: string;
//   email: string;
// }

async function FetchData({ type, id = "" }: { type: 'meetings' | 'members' | 'attendees' | 'attendance' | 'users', id?: string }) {
    const token = Cookies.get('session');

    let endpoint = ""
    if (type == "meetings")
        endpoint = "meetings/fetch";
    else if (type == "members")
        endpoint = "members/fetch";
    else if (type == "attendees")
        endpoint = "meetings/attendees";
    else if (type == "attendance")
        endpoint = "attendance/fetch";
    else if (type == "users")
        endpoint = "users/fetch";

    // else if (type == "club")
    //     endpoint = "clubs/fetch";

    try {
        const response = await axios.get<any>('http://localhost:3001/' + endpoint, {
            params: {
                id: (type == 'attendance' || type == 'attendees' || type == 'members') ? id : undefined
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