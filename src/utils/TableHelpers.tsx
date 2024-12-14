import { Link } from "react-router-dom"
import { adminDeleteClub, adminDeleteUser, deleteAttendance, deleteCustomField, deleteMeeting, deleteMember, removeAttendee } from "../services/DeleteData"
import { updateClubStatus, updateMeetingStatus, updateMemberStatus, updateUserStatus } from "../services/UpdateData"

export const headersMap: { [key in "meetings" | "members" | "attendees" | "attendance" | "users" | "clubs" | "customFields"]: string[] } = {
    meetings: ["Date", "Start Time", "End Time", "Status", "Volunteering", "Actions"],
    members: ["First Name", "Last Name", "Status", "Join Date", "Actions"],
    attendees: ["First Name", "Last Name", "Time Attended", "Actions"],
    attendance: ["Meeting Date", "Time Attended", "Volunteered", "Actions"],
    users: ["ID", "Username", "Status", "Admin", "Seen at", "IP", "Actions"],
    clubs: ["ID", "Owner", "Status", "Display Name", "External ID", "Volunteering", "Actions"],
    customFields: ["Field Name", "Field Type", "Default value", "Actions"],
}

export const dataKeyMap = {
    meetings: ["date", "startTime", "endTime", "status", "volunteering", "actions"],
    members: ["firstName", "lastName", "status", "joinedAt", "actions"],
    attendees: ["memberFirstName", "memberLastName", "time", "actions"],
    attendance: ["date", "time", "volunteering", "actions"],
    users: ["id", "username", "status", "admin", "seenAt", "lastIp", "actions"],
    clubs: ["id", "ownerId", "status", "displayName", "externalId", "volunteering", "actions"],
    customFields: ["fieldName", "fieldType", "defaultValue", "actions"],
}

export function getActions(type: string, row: any, reloadData: () => void) {
    switch (type) {
        case "meetings":
            return (
                <>
                    <Link to={`/dashboard/meeting/${row.id}`} className="text-blue-500 hover:underline">View</Link>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteMeeting({ id: row.id }, reloadData)}>Delete</span>
                </>
            )
        case "members":
            return (
                <>
                    <Link to={`/dashboard/member/${row.id}`} className="text-blue-500 hover:underline">View</Link>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteMember({ id: row.id }, reloadData)}>Delete</span>
                </>
            )
        case "attendees":
            return (
                <span className="text-red-500 hover:underline cursor-pointer" onClick={() => removeAttendee({ id: row.externalId })}>Remove</span>
            )
        case "attendance":
            return (
                <>
                    <Link to={`/dashboard/meeting/${row.meetingId}`} className="text-blue-500 hover:underline">View</Link>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteAttendance({ id: row.id }, reloadData)}>Delete</span>
                </>
            )
        case "users":
            return (
                <>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => adminDeleteUser({ id: row.id }, reloadData)}>Delete</span>
                </>
            )
        case "clubs":
            return (
                <>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => adminDeleteClub({ id: row.ownerId }, reloadData)}>Delete</span>
                </>
            )
        // TODO: Add custom fields actions
        case "customFields":
            return (
                <>
                    <Link to={`/dashboard/members/fields?id=${row.id}`} className="text-blue-500 hover:underline">Edit</Link>
                    <span className="text-red-500 hover:underline cursor-pointer ml-2" onClick={() => deleteCustomField({ id: row.id }, reloadData)}>Delete</span>
                </>
            )
        default:
            return null
    }
}

export function getStatus(type: string, row: any, current: any) {
    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value
        const updated = await updateMeetingStatus({ id: row.id }, newValue)
        if (updated)
            event.target.disabled = true
    }
    switch (type) {
        case "meetings":
            return (
                <>
                    <select defaultValue={current} disabled={current === "ended"} onChange={handleChange} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300 disabled:hover:cursor-not-allowed">
                        <option value="ongoing">Ongoing</option>
                        <option value="ended">Ended</option>
                    </select>
                </>
            )
        case "members":
            return (
                <>
                    <select defaultValue={current} onChange={async event => await updateMemberStatus({ id: row.id }, event.target.value)} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                    </select>
                </>
            )
        case "users":
            return (
                <>
                    <select defaultValue={current} onChange={async event => await updateUserStatus({ id: row.id }, event.target.value === "true")} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </>
            )
        case "clubs":
            return (
                <>
                    <select defaultValue={current} onChange={async event => await updateClubStatus({ id: row.id }, event.target.value === "true")} className="py-[2px] px-1 rounded-md text-[13px] bg-none appearance-auto hover:cursor-pointer disabled:bg-greyscale-300">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </>
            )
        default:
            return null
    }
}
