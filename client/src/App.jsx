import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout, user } = useAuth();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";
  const isDashboardRoute =
    location.pathname === "/dashboard" || location.pathname.startsWith("/dashboard/");
  const hidePublicChrome = isAuthRoute || isDashboardRoute;
  const backdropClassName = isDashboardRoute ? "dashboard-backdrop" : "app-backdrop";

  if (loading) {
    return (
      <div className="app-frame">
        <div className={backdropClassName} />
        <main className="page-shell">
          <section className="status-panel">
            <p className="eyebrow">Preparing workspace</p>
            <h1>Loading your CareerPilot experience</h1>
            <p className="muted-text">
              Restoring your saved session and getting your routes ready.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-frame">
      <div className={backdropClassName} />
      {hidePublicChrome ? null : (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={() => {
            logout();
            navigate("/", { replace: true });
          }}
          userName={user?.name}
        />
      )}

      <main className={hidePublicChrome ? "relative z-10" : "page-shell"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard user={user} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      {hidePublicChrome ? null : <Footer />}
    </div>
  );
}

export default App;
