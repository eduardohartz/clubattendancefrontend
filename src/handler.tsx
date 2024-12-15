import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"

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
import { useAuth } from "./utils/AuthContext"

function Handler() {
    const location = useLocation()
    const currentRoute = location.pathname
    const { user, club, isLoading } = useAuth()

    console.log(user)

    const showNavbar
        = (currentRoute.startsWith("/dashboard") || currentRoute === "/settings")
        && user
        && club

    return (
        <>
            {showNavbar && !isLoading && (
                <PageTransition key="sidebar">
                    <Sidebar page={currentRoute} />
                </PageTransition>
            )}
            <AnimatePresence mode="wait">
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
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Dashboard />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/settings"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Settings />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/settings"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <ClubSettings />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/members"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Members />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/members/create"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <CreateMember />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/members/fields"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <CustomFields />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/member/:id"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Member />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/meetings"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Meetings />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/dashboard/meeting/:id"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Meeting />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/logout"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Logout />
                                </PageTransition>
                            </ProtectedRoute>
                        )}
                    />

                    {/* Admin Route */}
                    <Route
                        path="/dashboard/admin"
                        element={(
                            <ProtectedRoute path={currentRoute}>
                                <PageTransition key={location.pathname}>
                                    <Admin />
                                </PageTransition>
                            </ProtectedRoute>
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
            </AnimatePresence>

        </>
    )
}

export default Handler
