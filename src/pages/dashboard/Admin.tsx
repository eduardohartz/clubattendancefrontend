import { useState } from 'react';
import Table from "../../components/Table";
import axios from 'axios';
import Cookies from 'js-cookie';

function Admin() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddUser = async () => {
        const username = prompt("Enter the username for the new user:");

        if (!username) {
            return;
        }

        setIsSubmitting(true);

        try {
            const token = Cookies.get('session');
            const response = await axios.post('http://localhost:3001/users/create', {
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
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-2xl font-bold ml-2">Users</span>
                        <button
                            className="bg-accent-100 px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                            onClick={handleAddUser}
                            disabled={isSubmitting}
                        >
                            <i className="fa-solid fa-plus fa-lg" /> Add User
                        </button>
                    </div>
                    <Table type={"users"} />
                </div>
            </div>
        </>
    );
}

export default Admin;