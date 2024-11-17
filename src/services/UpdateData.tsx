import axios from "axios";
import Cookies from "js-cookie";
import { toast, Slide } from "react-toastify";
const token = Cookies.get('session');

//Update statuses, origin from Table.tsx

export async function updateMemberStatus({ id }: { id: number }, newValue: string) {
    try {
        const response = await axios.post('http://localhost:3001/members/update', {
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
    if (newValue === "ongoing") return;

    try {
        const response = await axios.post('http://localhost:3001/meetings/update', {
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
    }
};

//Update a user's status (admin only)
export async function updateUserStatus({ id }: { id: number }, newValue: boolean) {

    try {
        const response = await axios.post('http://localhost:3001/admin/users/update', {
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
    try {
        const response = await axios.post('http://localhost:3001/admin/clubs/update', {
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

//Club Settings todo

export async function updateClubName(clubName: string) {

    try {
        const response = await axios.post('http://localhost:3001/club/update', {
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

    try {
        const response = await axios.post('http://localhost:3001/club/update', {
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