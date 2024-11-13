// src/Handler.tsx

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import Sidebar from "./components/Sidebar";  // Import the navbar directly here

// No login needed
import Landing from "./pages/Landing";
import Attend from "./pages/Attend";
import Login from "./pages/Login";

// Need to be logged in but not setup
import Setup from "./pages/Setup";
import Settings from "./pages/Settings";

// Need to be logged in and setup
import Dashboard from "./pages/dashboard/Home";
import ClubSettings from "./pages/dashboard/Settings";
import Members from "./pages/dashboard/members/Home";
import Member from "./pages/dashboard/members/View";
import CreateMember from "./pages/dashboard/members/Create";
import Meetings from "./pages/dashboard/meetings/Home";
import Meeting from "./pages/dashboard/meetings/View";
import Logout from "./pages/Logout";

//Admin
import Admin from "./pages/dashboard/Admin";

// 404
import Unknown from "./pages/404";

// utils
import ProtectedRoute from "./components/ProtectedRoute";

const Handler = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const showNavbar = currentRoute.startsWith("/dashboard") || currentRoute === "/settings";

  return (
    <>
      {showNavbar && <PageTransition><Sidebar page={currentRoute} /></PageTransition>}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Landing />
              </PageTransition>
            }
          />
          <Route
            path="/attend"
            element={
              <PageTransition>
                <Attend />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />
          <Route
            path="/setup"
            element={
              <PageTransition>
                <Setup />
              </PageTransition>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Logout />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />
          <Route
            path="/*"
            element={
              <PageTransition>
                <Unknown />
              </PageTransition>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Dashboard />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Settings />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <ClubSettings />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/dashboard/members"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Members />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/dashboard/members/create"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <CreateMember />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/dashboard/members/:id"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Member />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/dashboard/meetings"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Meetings />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />

          <Route
            path="/dashboard/meetings/:id"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Meeting />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute
                element={
                  <PageTransition>
                    <Admin />
                  </PageTransition>
                }
                path={currentRoute}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default Handler;