import type { Club, User } from "./types/models"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import Loading from "./components/Loading"
import PageTransition from "./components/PageTransition"
// utils
import ProtectedRoute from "./components/ProtectedRoute"

import Sidebar from "./components/Sidebar"
// 404
import Unknown from "./pages/404"

import Attend from "./pages/Attend"
// Admin
import Admin from "./pages/dashboard/Admin"
// Need to be logged in and setup
import Dashboard from "./pages/dashboard/Home"
import Meetings from "./pages/dashboard/meetings/Home"
import Meeting from "./pages/dashboard/meetings/View"
import CreateMember from "./pages/dashboard/members/Create"
import CustomFields from "./pages/dashboard/members/Fields"
import Members from "./pages/dashboard/members/Home"
import Member from "./pages/dashboard/members/View"

import ClubSettings from "./pages/dashboard/Settings"

// No login needed
import Landing from "./pages/Landing"

import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Settings from "./pages/Settings"
// Need to be logged in but not setup
import Setup from "./pages/Setup"
import { getClub, getUser } from "./services/Auth"

function Handler() {
    const location = useLocation()
    const currentRoute = location.pathname

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [club, setClub] = useState<Club | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const userData = await getUser()
                setUser(userData)

                if (userData) {
                    const clubData = await getClub()
                    setClub(clubData)
                } else {
                    setClub(null)
                }
            } catch {
                setUser(null)
                setClub(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [currentRoute])

    const showNavbar
        = (currentRoute.startsWith("/dashboard") || currentRoute === "/settings")
        && user
        && club

    return (
        <>
            {showNavbar && club && (
                <Sidebar page={currentRoute} user={user} club={club} />
            )}

            <AnimatePresence mode="wait">
                {isLoading && currentRoute !== "/" ? (
                    <PageTransition key="loading">
                        <Loading />
                    </PageTransition>
                ) : (
                    <Routes location={location} key={location.pathname}>
                        {/* Public Routes */}
                        <Route
                            path="/"
                            element={(
                                <PageTransition key={location.pathname}>
                                    <Landing />
                                </PageTransition>
                            )}
                        />
                        <Route
                            path="/attend"
                            element={(
                                <PageTransition key={location.pathname}>
                                    <Attend />
                                </PageTransition>
                            )}
                        />
                        <Route
                            path="/login"
                            element={(
                                <PageTransition key={location.pathname}>
                                    <Login />
                                </PageTransition>
                            )}
                        />
                        <Route
                            path="/setup"
                            element={(
                                <PageTransition key={location.pathname}>
                                    <Setup />
                                </PageTransition>
                            )}
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Dashboard club={club} user={user} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/settings"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Settings user={user} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/settings"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <ClubSettings club={club} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/members"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Members user={user} club={club} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/members/create"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <CreateMember />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/members/fields"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <CustomFields user={user} club={club} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/member/:id"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Member user={user} club={club} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/meetings"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Meetings user={user} club={club} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/dashboard/meeting/:id"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Meeting user={user} club={club} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />
                        <Route
                            path="/logout"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Logout />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />

                        {/* Admin Route */}
                        <Route
                            path="/dashboard/admin"
                            element={(
                                <ProtectedRoute
                                    path={currentRoute}
                                    user={user}
                                    club={club}
                                    element={(
                                        <PageTransition key={location.pathname}>
                                            <Admin user={user} />
                                        </PageTransition>
                                    )}
                                />
                            )}
                        />

                        {/* 404 Route */}
                        <Route
                            path="*"
                            element={(
                                <PageTransition key={location.pathname}>
                                    <Unknown />
                                </PageTransition>
                            )}
                        />
                    </Routes>
                )}
            </AnimatePresence>

        </>
    )
}

export default Handler
