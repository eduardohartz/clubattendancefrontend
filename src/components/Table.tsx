import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FetchData from '../services/FetchData';
import { deleteMeeting, deleteMember, removeAttendee, deleteAttendance, deleteUser, adminDeleteClub } from '../services/DeleteData';
import { updateClubStatus, updateMeetingStatus, updateMemberStatus, updateUserStatus } from '../services/UpdateData';

const headersMap: { [key in 'meetings' | 'members' | 'attendees' | 'attendance' | 'users' | 'clubs']: string[] } = {
    meetings: ["Date", "Start Time", "End Time", "Status", "Volunteering", "Actions"],
    members: ["First Name", "Last Name", "Status", "Join Date", "Actions"],
    attendees: ["First Name", "Last Name", "Time Attended", "Actions"],
    attendance: ["Date", "Time Added", "Volunteering", "Actions"],
    users: ["ID", "Username", "Status", "Admin", "Seen at", "IP", "Actions"],
    clubs: ["ID", "Owner", "Status", "Display Name", "External ID", "Volunteering", "Actions"],
};

const dataKeyMap = {
    meetings: ["startTime", "startTime", "endTime", "status", "volunteering", "actions"],
    members: ["firstName", "lastName", "status", "joinedAt", "actions"],
    attendees: ["firstName", "lastName", "timeAttended", "actions"],
    attendance: ["date", "timeAdded", "volunteering", "actions"],
    users: ["id", "username", "status", "admin", "seenAt", "lastIp", "actions"],
    clubs: ["id", "owner", "status", "displayName", "externalId", "volunteering", "actions"],
};

const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const formatTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const getStatus = (type: string, row: any, current: any) => {
    switch (type) {
        case 'meetings':
            return (
                <>
                    <select defaultValue={current} disabled={current == "ended" ? true : false} onChange={async (event) => await updateMeetingStatus({ id: row.id }, event.target.value)} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300 disabled:hover:cursor-not-allowed">
                        <option value="ongoing">Ongoing</option>
                        <option value="ended">Ended</option>
                    </select>
                </>
            );
        case 'members':
            return (
                <>
                    <select defaultValue={current} onChange={async (event) => await updateMemberStatus({ id: row.id }, event.target.value)} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                    </select>
                </>
            );
        case 'users':
            return (
                <>
                    <select defaultValue={current} onChange={async (event) => await updateUserStatus({ id: row.id }, event.target.value === "true")} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </>
            );
        case 'clubs':
            return (
                <>
                    <select defaultValue={current} onChange={async (event) => await updateClubStatus({ id: row.id }, event.target.value === "true")} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </>
            );
        default:
            return null;
    }
};

const getActions = (type: string, row: any, reloadData: () => void) => {
    switch (type) {
        case 'meetings':
            return (
                <>
                    <Link to={`/dashboard/meetings/${row.id}`} className="text-blue-500 hover:underline">View</Link>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteMeeting({ id: row.id }, reloadData)}>Delete</span>
                </>
            );
        case 'members':
            return (
                <>
                    <Link to={`/dashboard/members/${row.id}`} className="text-blue-500 hover:underline">View</Link>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteMember({ id: row.id }, reloadData)}>Delete</span>
                </>
            );
        case 'attendees':
            return (
                <span className="text-red-500 hover:underline cursor-pointer" onClick={() => removeAttendee({ id: row.id })}>Remove</span>
            );
        case 'attendance':
            return (
                <span className="text-red-500 hover:underline cursor-pointer" onClick={() => deleteAttendance({ id: row.id }, reloadData)}>Delete</span>
            );
        case 'users':
            return (
                <>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteUser({ id: row.id }, reloadData)}>Delete</span>
                </>
            );
        case 'clubs':
            return (
                <>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => adminDeleteClub({ id: row.owner }, reloadData)}>Delete</span>
                </>
            );
        default:
            return null;
    }
};

function Table({ type, id = "", user }: { type: 'meetings' | 'members' | 'attendees' | 'attendance' | 'users' | 'clubs', id?: string, user: any }) {
    const [data, setData] = useState([]);

    const reloadData = async () => {
        const result = await FetchData({ type, id });
        setData(result);
    };

    useEffect(() => {
        if (user && (type !== "users" || user.admin)) {
            reloadData();
        }
    }, [user, type, id]);

    if (!user || (type === "users" && !user.admin)) {
        return null;
    }

    const headers = headersMap[type] || [];
    const dataKeys = dataKeyMap[type] || [];

    return (
        <div className="bg-greyscale-100 outline-1 outline-greyscale-200 rounded-lg outline overflow-clip">
            <table className="w-[100%] m-0 border-collapse">
                <thead className='h-[45px]'>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-4 py-2 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {dataKeys.map((key, colIndex) => (
                                <td key={colIndex} className={"hover:cursor-pointer px-4 py-2 border-gray-200 text-sm text-gray-700 " + (rowIndex % 2 ? "" : "bg-greyscale-200")}>
                                    {key === 'date' || key === 'joinedAt' || key === 'seenAt' ? formatDate(row[key]) :
                                        (key === 'startTime' && colIndex == 0 && type == "meetings") ? formatDate(row[key]) :
                                            key === 'startTime' || key === 'endTime' || key === 'timeAttended' || key === 'timeAdded' ? formatTime(row[key]) :
                                                key === 'actions' ? getActions(type, row, reloadData) :
                                                    key == 'volunteering' || key == 'admin' ? (row[key] ? "Yes" : "No") :
                                                        key == 'status' ? getStatus(type, row, row[key]) :
                                                            row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;