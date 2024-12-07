import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {
    const location = useLocation();
    const isLoggedIn = window.localStorage.getItem("token") !== null;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                HandUp
            </Link>
            <button 
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                {isLoggedIn ? (
                    <>
                        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                            Home
                        </Link>
                        <Link to="/create-project" className="nav-link">
                            Create Project
                        </Link>
                        <Link to="/logout" className={location.pathname === "/logout" ? "active" : ""}>
                            Log Out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
                            Login
                        </Link>
                        <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;