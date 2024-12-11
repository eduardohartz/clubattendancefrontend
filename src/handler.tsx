import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import Sidebar from "./components/Sidebar";

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

// Admin
import Admin from "./pages/dashboard/Admin";

// 404
import Unknown from "./pages/404";

// utils
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import { getUser, getClub } from "./services/Auth";
import Loading from "./components/Loading";
import { User, Club } from "./types/models";

const Handler = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [club, setClub] = useState<Club | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const user = await getUser();
        const club = user ? await getClub() : null;
        setUser(user);
        setClub(club);
      } catch (error) {
        setUser(null);
        setClub(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentRoute]);

  const showNavbar = currentRoute.startsWith("/dashboard") || currentRoute === "/settings";

  return (
    <>
      {showNavbar && club && <PageTransition><Sidebar page={currentRoute} user={user} club={club} /></PageTransition>}

      {isLoading && currentRoute != "/" ? (
        <Loading />
      ) : (
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
              path="/*"
              element={
                <PageTransition>
                  <Unknown />
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
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Dashboard club={club} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Settings user={user} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <ClubSettings club={club} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard/members"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Members user={user} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
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
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard/member/:id"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Member user={user} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard/meetings"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Meetings user={user} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard/meeting/:id"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Meeting user={user} club={club} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute
                  element={
                    <PageTransition>
                      <Admin user={user} />
                    </PageTransition>
                  }
                  path={currentRoute}
                  user={user}
                  club={club}
                />
              }
            />
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
};

export default Handler;