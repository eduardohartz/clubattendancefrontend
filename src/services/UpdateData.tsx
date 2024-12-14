import axios from "axios";
import Cookies from "js-cookie";
import getBaseUrl from "./Api";
import { errorToast, successToast } from "../components/Toast";

export async function updateMeeting(id: string, newNotes: string = "", volunteering: boolean = false, endMeeting: boolean = false) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    const data: any = {};

    data.id = id;
    data.notes = newNotes;
    data.volunteering = volunteering;

    if (endMeeting == true) {
        data.status = "ended";
    }

    try {
        const response = await axios.post(getBaseUrl() + '/meetings/update', data, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Meeting updated")
        } else {
            errorToast("Error updating meeting")
        }
    } catch {
        errorToast("Error updating meeting")
    }
};

//Update statuses, origin from Table.tsx

export async function updateMemberStatus({ id }: { id: number }, newValue: string) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/members/update', {
            id,
            status: newValue
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Member updated")
        } else {
            errorToast("Error updating member")
        }
    } catch {
        errorToast("Error updating member")
    }
};

export async function updateMeetingStatus({ id }: { id: number }, newValue: string) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    if (newValue === "ongoing") return;

    try {
        const response = await axios.post(getBaseUrl() + '/meetings/update', {
            id,
            status: newValue
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Meeting updated")
            return true;
        } else {
            errorToast("Error updating meeting")
            return false;
        }
    } catch {
        errorToast("Error updating meeting")
        return false;
    }
};

//Club Settings

export async function updateClubName(clubName: string) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/club/update', {
            clubName,
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Club updated")
        } else {
            errorToast("Error updating club")
        }
    } catch {
        errorToast("Error updating club")
    }

};

export async function updateOfficerName(officerName: string) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/club/update', {
            officerName,
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Club updated")
        } else {
            errorToast("Error updating club")
        }
    } catch {
        errorToast("Error updating club")
    }

};

export async function updateUseStaticCode(useStaticCode: boolean) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/club/update', {
            useStaticCode,
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Club updated")
        } else {
            errorToast("Error updating club")
        }
    } catch {
        errorToast("Error updating club")
    }

}

export async function updateAllowSelfRegistration(allowSelfRegistration: boolean) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/club/update', {
            allowSelfRegistration,
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Club updated")
        } else {
            errorToast("Error updating club")
        }
    } catch {
        errorToast("Error updating club")
    }

}

//User Settings

export async function updatePassword(currentPassword: string, newPassword: string, repeatNewPassword: string) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    if (newPassword !== repeatNewPassword) {
        errorToast("Passwords do not match!")
        return;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/user/update', {
            currentPassword,
            newPassword
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Password updated")
        } else {
            errorToast("Error updating password")
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            errorToast(error.response.data.errors[0])
        } else {
            errorToast("Error updating password")
        }
    }
}

export async function updateWelcome() {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        await axios.post(getBaseUrl() + '/user/welcome', {}, {
            headers: {
                'Authorization': `${token}`,
            }
        });
    } catch {
        return
    }
}

//Update a user's status (admin only)
export async function updateUserStatus({ id }: { id: number }, newValue: boolean) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/admin/users/update', {
            id,
            status: newValue
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("User updated")
        } else {
            errorToast("Error updating user")
        }
    } catch {
        errorToast("Error updating user")
    }
};

//Update a club's status (admin only)
export async function updateClubStatus({ id }: { id: number }, newValue: boolean) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(getBaseUrl() + '/admin/clubs/update', {
            id,
            status: newValue
        }, {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success) {
            successToast("Club updated")
        } else {
            errorToast("Error updating club")
        }
    } catch {
        errorToast("Error updating club")
    }
};