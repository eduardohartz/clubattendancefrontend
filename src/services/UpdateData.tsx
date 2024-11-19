import axios from "axios";
import Cookies from "js-cookie";
import { toast, Slide } from "react-toastify";
import getBaseUrl from "./Api";

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
            toast.success("Member updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating member", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating member", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Meeting updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return true;
        } else {
            toast.error("Error updating meeting", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return false;
        }
    } catch (error) {
        toast.error("Error updating meeting", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
        return false;
    }
};

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
            toast.success("User updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating user", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating user", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Club updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating club", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating club", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Club updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating club", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating club", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Club updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating club", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating club", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Club updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating club", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating club", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Club updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating club", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        toast.error("Error updating club", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    }

}

//User Settings

export async function updatePassword(currentPassword: string, newPassword: string, repeatNewPassword: string) {

    const token = Cookies.get('session');

    if (!token) {
        return null;
    }

    if (newPassword !== repeatNewPassword) {
        toast.error("Passwords do not match!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
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
            toast.success("Password updated", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            toast.error(error.response.data.error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else {
            toast.error("Error updating password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }
}