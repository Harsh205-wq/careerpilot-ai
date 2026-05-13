import { Link, useLocation } from "react-router-dom";
import Button from "./Button.jsx";
import { APP_NAME } from "../utils/constants.js";

const publicNavItems = [
  { id: "home", label: "Home", to: "/" },
  { id: "features", label: "Features", to: "/#features" },
  { id: "login", label: "Login", to: "/login" },
  { id: "signup", label: "Signup", to: "/signup" },
];

const privateNavItems = [
  { id: "dashboard", label: "Dashboard", to: "/dashboard" },
  { id: "home", label: "Home", to: "/" },
];

function Navbar({ isAuthenticated, onLogout, userName }) {
  const location = useLocation();
  const showDashboardNav = isAuthenticated && location.pathname === "/dashboard";
  const navItems = showDashboardNav ? privateNavItems : publicNavItems;

  const isActive = (item) => {
    if (item.id === "features") {
      return location.pathname === "/" && location.hash === "#features";
    }

    if (item.id === "home") {
      return location.pathname === "/" && location.hash !== "#features";
    }

    return location.pathname === item.to;
  };

  return (
    <header className="navbar">
      <Link
        className="brand-mark"
        to={showDashboardNav ? "/dashboard" : "/"}
      >
        <span className="brand-dot" />
        <span>{APP_NAME}</span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            className={`nav-link ${isActive(item) ? "is-active" : ""}`.trim()}
            key={item.id}
            to={item.to}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        {showDashboardNav ? (
          <>
            <span className="user-chip">{userName || "Explorer"}</span>
            <Button onClick={onLogout} variant="secondary">
              Log out
            </Button>
          </>
        ) : (
          <Link className="button button-primary" to="/signup">
            Get started
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
