import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { Club } from '../../types/models';

function Home({ club }: { club: Club | null }) {

    if (!club) {
        return;
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Dashboard | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
            <div className="usablesize h-[100vh] absolute top-0 right-0 flex flex-col items-center gap-10">
                <div className="absolute top-[100px] min-w-[80%]">
                    <div className="mx-auto flex w-[100%] items-center justify-between mb-5">
                        <span className="justify-start text-3xl font-bold ml-2">Welcome back{club.officer ? ", " + club.officer : ""}!</span>
                    </div>
                    <div>

                        <div className="grid grid-cols-5 grid-rows-5 gap-4 h-full">
                            <div className="col-span-3 row-span-3 bg-greyscale-100 rounded-lg">

                            </div>
                            <div className="col-span-2 row-span-1 col-start-4 bg-greyscale-100 rounded-lg">
                                <div className='flex items-center justify-center w-full h-full'>
                                    <div className="text-2xl font-bold pr-2 flex">
                                        <svg width="90px" height="90px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 19V18C3 15.7909 4.79086 14 7 14H11C13.2091 14 15 15.7909 15 18V19M15 11C16.6569 11 18 9.65685 18 8C18 6.34315 16.6569 5 15 5M21 19V18C21 15.7909 19.2091 14 17 14H16.5M12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div className='flex flex-col'>
                                            <span className="text-[17px]">Members</span>
                                            <span className='text-5xl text-accent-100'>0</span>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold flex">
                                        <svg className="m-2" width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1266 22.1995C16.7081 22.5979 17.4463 23.0228 18.3121 23.3511C19.9903 23.9874 21.244 24.0245 21.8236 23.9917C23.1167 23.9184 23.2907 23.0987 22.5972 22.0816C21.8054 20.9202 21.0425 19.6077 21.1179 18.1551C22.306 16.3983 23 14.2788 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C13.4578 23 14.8513 22.7159 16.1266 22.1995ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.3697 21 14.6654 20.6947 15.825 20.1494C16.1635 19.9902 16.5626 20.0332 16.8594 20.261C17.3824 20.6624 18.1239 21.1407 19.0212 21.481C19.4111 21.6288 19.7674 21.7356 20.0856 21.8123C19.7532 21.2051 19.4167 20.4818 19.2616 19.8011C19.1018 19.0998 18.8622 17.8782 19.328 17.2262C20.3808 15.7531 21 13.9503 21 12C21 7.02944 16.9706 3 12 3ZM13.25 16.75C13.25 17.4404 12.6904 18 12 18C11.3096 18 10.75 17.4404 10.75 16.75C10.75 16.0596 11.3096 15.5 12 15.5C12.6904 15.5 13.25 16.0596 13.25 16.75ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V7Z" fill="#000000" />
                                        </svg>
                                        <div className='flex flex-col'>
                                            <span className="text-[17px]">Meetings</span>
                                            <span className='text-5xl text-accent-100'>0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-4 col-start-4 row-start-2 bg-greyscale-100 rounded-lg">

                            </div>
                            <div className="col-span-3 row-span-2 row-start-4 bg-greyscale-100 rounded-lg">
                                <div className="flex flex-col p-2">
                                    <span className="text-2xl font-bold pt-3 pl-4"><FontAwesomeIcon icon={faNewspaper} /> News</span>
                                    <span className="text-lg py-2 px-5">Website has just launched! Report any bugs or suggestions <a href="https://google.com" target="_blank" className="text-accent-100 hover:text-accent-200 visited:text-accent-100 underline">here</a></span>
                                    <span className="text-lg py-2 px-5">Next on the todo list:
                                        <ul className="list-disc list-inside">
                                            <li>Member import and export</li>
                                            <li>Meeting import and export</li>
                                            <li>Finish dashboard</li>
                                        </ul>
                                    </span>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;