import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"

import PageTransition from "./components/PageTransition"
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
import Setup from "./pages/Setup"
import { useAuth } from "./utils/AuthContext"
import { JSX } from "react"

interface RouteWrapperProps {
    element: JSX.Element
    protectedRoute?: boolean
}

function RouteWrapper({ element, protectedRoute = false }: RouteWrapperProps) {
    const location = useLocation()
    const currentRoute = location.pathname

    if (protectedRoute)
        return (
            <ProtectedRoute path={currentRoute}>
                <PageTransition>{element}</PageTransition>
            </ProtectedRoute>
        )
    return <PageTransition>{element}</PageTransition>
}

function Handler() {
    const location = useLocation()
    const currentRoute = location.pathname
    const { user, club, isLoading } = useAuth()

    const showNavbar =
        (currentRoute.startsWith("/dashboard") || currentRoute === "/settings") &&
        user &&
        club

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
                        element={<RouteWrapper element={<Landing />} />}
                    />
                    <Route
                        path="/attend"
                        element={<RouteWrapper element={<Attend />} />}
                    />
                    <Route
                        path="/login"
                        element={<RouteWrapper element={<Login />} />}
                    />
                    <Route
                        path="/setup"
                        element={<RouteWrapper element={<Setup />} />}
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={<RouteWrapper element={<Dashboard />} protectedRoute />}
                    />
                    <Route
                        path="/settings"
                        element={<RouteWrapper element={<Settings />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/settings"
                        element={<RouteWrapper element={<ClubSettings />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/members"
                        element={<RouteWrapper element={<Members />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/members/create"
                        element={<RouteWrapper element={<CreateMember />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/members/fields"
                        element={<RouteWrapper element={<CustomFields />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/member/:id"
                        element={<RouteWrapper element={<Member />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/meetings"
                        element={<RouteWrapper element={<Meetings />} protectedRoute />}
                    />
                    <Route
                        path="/dashboard/meeting/:id"
                        element={<RouteWrapper element={<Meeting />} protectedRoute />}
                    />
                    <Route
                        path="/logout"
                        element={<RouteWrapper element={<Logout />} protectedRoute />}
                    />

                    {/* Admin Route */}
                    <Route
                        path="/dashboard/admin"
                        element={<RouteWrapper element={<Admin />} protectedRoute />}
                    />

                    {/* 404 Route */}
                    <Route
                        path="*"
                        element={<RouteWrapper element={<Unknown />} />}
                    />
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default Handler