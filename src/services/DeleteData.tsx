import axios from "axios"
import Cookies from "js-cookie"
import { errorToast, successToast } from "../components/Toast"
import getBaseUrl from "./Api"

// Delete member from members table

export async function deleteMember({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete this member? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE RECORDS!")

    if (!confirmation) {
        return
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/members/delete`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success === "true") {
            successToast("Member deleted")
            callback()
        } else {
            errorToast("Error deleting member")
        }
    } catch {
        errorToast("Error deleting member")
    }

};

// Delete meeting from meetings table

export async function deleteMeeting({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete this meeting? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE RECORDS!")

    if (!confirmation) {
        return
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/meetings/delete`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success === "true") {
            successToast("Meeting deleted")
            callback()
        } else {
            errorToast("Error deleting meeting")
        }
    } catch {
        errorToast("Error deleting meeting")
    }

};

// Delete attendance from a member's attendance table

export async function deleteAttendance({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete this attendance record? THIS IS IRREVERSABLE!")

    if (!confirmation) {
        return
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/attendance/delete`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success === "true") {
            successToast("Record deleted")
            callback()
        } else {
            errorToast("Error deleting record")
        }
    } catch {
        errorToast("Error deleting record")
    }

};

// Remove an attendee from a meeting attendee table

export async function removeAttendee({ id }: { id: number }) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/meetings/attendee`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success !== "true") {
            errorToast("Error deleting attendee")
        }
    } catch {
        errorToast("Error deleting attendee")
    }

};

// Delete club

export async function deleteClub() {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete your club? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE DATA!")

    if (!confirmation) {
        return false
    }

    const confirmation2 = confirm("This will put your account back in the setup phase, and will reset your password. Are you sure you want to continue?")

    if (!confirmation2) {
        return false
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/club/delete`, {
            headers: {
                Authorization: `${token}`,
            },
        })

        if (response.data.success === "true") {
            Cookies.remove("session")
            return true
        } else {
            errorToast("Error deleting club")
            return false
        }
    } catch {
        errorToast("Error deleting club")
        return false
    }

};

// Delete user

export async function deleteUser() {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete your user? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE DATA!")

    if (!confirmation) {
        return false
    }

    const confirmation2 = confirm("This action is irrevarsable, you will not be able to login anymore. Are you sure you want to continue?")

    if (!confirmation2) {
        return false
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/user/delete`, {
            headers: {
                Authorization: `${token}`,
            },
        })

        if (response.data.success === "true") {
            Cookies.remove("session")
            return true
        } else {
            errorToast("Error deleting account")
            return false
        }
    } catch {
        errorToast("Error deleting account")
        return false
    }

};

// Delete custom field

export async function deleteCustomField({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete this field? THIS WILL DELETE ALL MEMBER DATA ASSOCIATED WITH THIS FIELD!")

    if (!confirmation) {
        return
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/members/fields/delete`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success === "true") {
            successToast("Field deleted")
            callback()
        } else {
            errorToast("Error deleting field")
        }
    } catch {
        errorToast("Error deleting field")
    }

};

// Delete user (admin only)

export async function adminDeleteUser({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete this user? THE CLUB WILL AND ITS DATA WILL BE DELETED!")

    if (!confirmation) {
        return
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/admin/users/delete`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success === "true") {
            successToast("User deleted")
            callback()
        } else {
            errorToast("Error deleting user")
        }
    } catch {
        errorToast("Error deleting user")
    }

};

// Delete club (admin only)

export async function adminDeleteClub({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    const confirmation = confirm("Are you sure you want to delete this club? ITS DATA WILL BE DELETED!")

    if (!confirmation) {
        return
    }

    try {
        const response = await axios.delete(`${getBaseUrl()}/admin/clubs/delete`, {
            headers: {
                Authorization: `${token}`,
                Id: `${id}`,
            },
        })

        if (response.data.success === "true") {
            successToast("Club deleted")
            callback()
        } else {
            errorToast("Error deleting club")
        }
    } catch {
        errorToast("Error deleting club")
    }

};
