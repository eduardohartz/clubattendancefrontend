import axios from "axios";
import Cookies from "js-cookie";
import { toast, Slide } from "react-toastify";

const token = Cookies.get('session');

export async function deleteMember({ id }: { id: number }, callback: () => void) {

    const confirmation = await confirm("Are you sure you want to delete this member? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE RECORDS!");

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

export async function deleteMeeting({ id }: { id: number }, callback: () => void) {

    const confirmation = await confirm("Are you sure you want to delete this meeting? THIS WILL DELETE ALL ASSOCIATED ATTENDANCE RECORDS!");

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

export async function deleteAttendance({ id }: { id: number }, callback: () => void) {

    const confirmation = await confirm("Are you sure you want to delete this attendance record? THIS IS IRREVERSABLE!");

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

export async function removeAttendee({ id }: { id: number }) {

};

export async function deleteUser({ id }: { id: number }, callback: () => void) {

    const confirmation = await confirm("Are you sure you want to delete this user? THE CLUB WILL AND ITS DATA WILL BE DELETED!");

    if (!confirmation) {
        return;
    }

    try {
        const response = await axios.delete('http://localhost:3001/users/delete', {
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