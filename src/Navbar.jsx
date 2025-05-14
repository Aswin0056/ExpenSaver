import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Css/Navbar.css";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location]); // Recheck login status on route change

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className="nav-container"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(15deg, grey 40%, black 55%)`,
        borderRadius: "20px",
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        margin: "1rem",
      }}
    >
      <h1
        style={{
          color: "white",
          marginTop: 0,
          marginBottom: 0,
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.9rem",
          fontWeight: 600,
          letterSpacing: "1px",
          textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
        }}
      >
        Expen<span style={{ color: "#FFD700" }}>Saver</span>
      </h1>

      <div className="navbar-links">
        {location.pathname !== "/" && <Link to="/">Home</Link>}

        {isLoggedIn ? (
          <>
            {location.pathname !== "/dashboard" && <Link to="/dashboard">Dashboard</Link>}
            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && <Link to="/login">Login</Link>}
            {location.pathname !== "/register" && <Link to="/register">Register</Link>}
          </>
        )}
      </div>

      <button className="navbar-toggle" onClick={() => setShowDropdown(!showDropdown)}>
        ☰
      </button>

      <div className={`navbar-dropdown ${showDropdown ? "show" : ""}`}>
        {location.pathname !== "/" && <Link to="/" onClick={() => setShowDropdown(false)}>Home</Link>}

        {isLoggedIn ? (
          <>
            {location.pathname !== "/dashboard" && (
              <Link to="/dashboard" onClick={() => setShowDropdown(false)}>Dashboard</Link>
            )}
            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login" onClick={() => setShowDropdown(false)}>Login</Link>
            )}
            {location.pathname !== "/register" && (
              <Link to="/register" onClick={() => setShowDropdown(false)}>Register</Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
