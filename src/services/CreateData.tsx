import axios from "axios";
import Cookies from "js-cookie";
import getBaseUrl from "./Api";
import { errorToast, successToast } from "../components/Toast";

export async function createMeeting() {
    const token = Cookies.get('session');

    try {
        const response = await axios.post<any>(getBaseUrl() + '/meetings/create', {}, {
            headers: {
                'Authorization': `${token}`,
            }
        });
        if (response.data.id) {
            successToast("Meeting created")
            return response.data.id
        } else {
            errorToast("Error creating meeting")
            return null
        }
    } catch (error) {
        errorToast("Error creating meeting")
        return null
    }
};

export async function createMember(firstName: string, lastName: string) {
    const token = Cookies.get('session');

    try {

        const response = await axios.post(getBaseUrl() + '/members/create', {
            firstName,
            lastName
        }, {
            headers: {
                'Authorization': `${token}`
            }
        });

        if (response.data.id) {
            successToast("Member created")
            return response.data.id;
        } else {
            errorToast("Error creating member")
            return null;
        }
    } catch (err) {
        errorToast("Error creating member")
    }
};

export async function createAttendee(memberId: string, meetingId: string) {
    const token = Cookies.get('session');

    try {
        const response = await axios.post(getBaseUrl() + '/meetings/attendee', {
            memberId,
            meetingId
        }, {
            headers: {
                'Authorization': `${token}`
            }
        });
        if (response.data.success) {
            successToast("Attendee added")
            return response.data.id
        } else {
            errorToast("Error adding attendee")
            return null
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400 && error.response?.data?.error.includes("already")) {
            errorToast("Attendee already added")
            return null
        }
        errorToast("Error adding attendee")
        return null
    }
};

export async function attendMeeting(code: string, memberId: string, lastName: string, register: boolean, firstName: string = "") {
    try {
        const response = await axios.post(getBaseUrl() + '/attend', {
            code,
            memberId,
            lastName,
            register,
            firstName
        });
        if (response.data.success) {
            return true
        } else {
            return response.data.errors[0]
        }
    } catch (error) {
        if (axios.isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 500)) {
            return error.response?.data?.errors[0]
        }
        return false
    }
};

export async function createCustomField(fieldName: string, fieldType: string, dropdownValues: string[] = [], defaultValue: string = "") {
    const token = Cookies.get('session');

    try {
        const response = await axios.post(getBaseUrl() + '/members/fields/create', {
            fieldName,
            fieldType,
            defaultValue,
            dropdownValues
        }, {
            headers: {
                'Authorization': `${token}`
            }
        });
        if (response.data.success) {
            return true
        } else {
            errorToast("Error creating field.")
            return false
        }
    } catch (error) {
        errorToast("Error creating field.")
        return false
    }

}