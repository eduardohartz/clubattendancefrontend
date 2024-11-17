import { Helmet } from "react-helmet";

function Settings({ user }: { user: any }) {

    return (
        <>
            <Helmet>
                <title>User Settings | Club Attendance</title>
            </Helmet>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[40%] bg-greyscale-100 rounded-lg h-[400px] p-8">
                    <div className="mx-auto flex w-[100%] flex-col gap-10 mb-5 items-left">
                        <span className="text-2xl font-bold ml-2 self-center">User Settings</span>
                        <div className="flex flex-col w-fit gap-6">
                            <span className="text-xl">User ID: {user.id}</span>
                            <span className="text-xl">Username: {user.username}</span>
                            <button
                                className="bg-accent-100 hover:bg-accent-200 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                            >
                                <i className="fa-solid fa-key fa-lg" /> Change Password
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 transition-colors px-[25px] py-[12px] rounded-lg text-[13.5px] mr-2 justify-end"
                            >
                                <i className="fa-solid fa-trash fa-lg" /> Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;