import axios from "axios";
import Cookies from "js-cookie";
import { toast, Slide } from "react-toastify";

//Delete member from members table

export async function deleteMember({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete this member? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE RECORDS!");

    if (!confirmation) {
        return;
    }

    try {
        const response = await axios.delete('http://localhost:3001/members/delete', {
            headers: {
                'Authorization': `${token}`,
                'Id': `${id}`
            }
        });

        if (response.data.success == "true") {
            toast.success("Member deleted", {
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
            callback();
        } else {
            toast.error("Error deleting member", {
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
        toast.error("Error deleting member", {
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

//Delete meeting from meetings table

export async function deleteMeeting({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete this meeting? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE RECORDS!");

    if (!confirmation) {
        return;
    }

    try {
        const response = await axios.delete('http://localhost:3001/meetings/delete', {
            headers: {
                'Authorization': `${token}`,
                'Id': `${id}`
            }
        });

        if (response.data.success == "true") {
            toast.success("Meeting deleted", {
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
            callback();
        } else {
            toast.error("Error deleting meeting", {
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
        toast.error("Error deleting meeting", {
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

//Delete attendance from a member's attendance table

export async function deleteAttendance({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete this attendance record? THIS IS IRREVERSABLE!");

    if (!confirmation) {
        return;
    }

    try {
        const response = await axios.delete('http://localhost:3001/attendance/delete', {
            headers: {
                'Authorization': `${token}`,
                'Id': `${id}`
            }
        });

        if (response.data.success == "true") {
            toast.success("Record deleted", {
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
            callback();
        } else {
            toast.error("Error deleting record", {
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
        toast.error("Error deleting record", {
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

//Remove an attendee from a meeting attendee table

export async function removeAttendee({ id }: { id: number }) {

    const token = Cookies.get('session');

    try {
        const response = await axios.delete('http://localhost:3001/meetings/attendee', {
            headers: {
                'Authorization': `${token}`,
                'Id': `${id}`
            }
        });

        if (response.data.success != "true") {
            toast.error("Error deleting attendee", {
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
        toast.error("Error deleting attendee", {
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

//Delete club

export async function deleteClub() {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete your club? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE DATA!");

    if (!confirmation) {
        return false;
    }

    const confirmation2 = confirm("This will put your account back in the setup phase, and will reset your password. Are you sure you want to continue?");

    if (!confirmation2) {
        return false;
    }

    try {
        const response = await axios.delete('http://localhost:3001/club/delete', {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success == "true") {
            Cookies.remove('session')
            return true;
        } else {
            toast.error("Error deleting club", {
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
        toast.error("Error deleting club", {
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

//Delete user

export async function deleteUser() {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete your user? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE DATA!");

    if (!confirmation) {
        return false;
    }

    const confirmation2 = confirm("This action is irrevarsable, you will not be able to login anymore. Are you sure you want to continue?");

    if (!confirmation2) {
        return false;
    }

    try {
        const response = await axios.delete('http://localhost:3001/user/delete', {
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (response.data.success == "true") {
            Cookies.remove('session')
            return true;
        } else {
            toast.error("Error deleting user", {
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
        toast.error("Error deleting user", {
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

//Delete user (admin only)

export async function adminDeleteUser({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete this user? THE CLUB WILL AND ITS DATA WILL BE DELETED!");

    if (!confirmation) {
        return;
    }

    try {
        const response = await axios.delete('http://localhost:3001/admin/users/delete', {
            headers: {
                'Authorization': `${token}`,
                'Id': `${id}`
            }
        });

        if (response.data.success == "true") {
            toast.success("User deleted", {
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
            callback();
        } else {
            toast.error("Error deleting user", {
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
        toast.error("Error deleting user", {
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

//Delete club (admin only)

export async function adminDeleteClub({ id }: { id: number }, callback: () => void) {

    const token = Cookies.get('session');

    const confirmation = confirm("Are you sure you want to delete this club? ITS DATA WILL BE DELETED!");

    if (!confirmation) {
        return;
    }

    try {
        const response = await axios.delete('http://localhost:3001/admin/clubs/delete', {
            headers: {
                'Authorization': `${token}`,
                'Id': `${id}`
            }
        });

        if (response.data.success == "true") {
            toast.success("Club deleted", {
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
            callback();
        } else {
            toast.error("Error deleting club", {
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
        toast.error("Error deleting club", {
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