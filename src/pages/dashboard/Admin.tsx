import { useState } from 'react';
import Table from "../../components/Table";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';

function Admin({ user }: { user: any }) {

    if (!user)
        return

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddUser = async () => {
        const username = prompt("Enter the username for the new user:");

        if (!username) {
            return;
        }

        setIsSubmitting(true);

        try {
            const token = Cookies.get('session');
            const response = await axios.post('http://localhost:3001/admin/users/create', {
                username
            }, {
                headers: {
                    'Authorization': `${token}`,
                }
            });

            if (response.data.success) {
                alert("User created successfully");
                window.location.reload();
            } else {
                alert("Failed to create user");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin | Club Attendance</title>
            </Helmet>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="relative top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Users</span>
                        <button
                            className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                            onClick={handleAddUser}
                            disabled={isSubmitting}
                        >
                            <i className="fa-solid fa-plus fa-lg" /> Add User
                        </button>
                    </div>
                    <Table type={"users"} user={user} />
                </div>
                <div className="relative top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Clubs</span>
                    </div>
                    <Table type={"clubs"} user={user} />
                </div>
            </div>
        </>
    );
}

export default Admin;