import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import postLogin from "../api/post-login";
import "./NavBar.css";

function NavBar() {
    const location = useLocation();
    const isLoggedIn = window.localStorage.getItem("token") !== null;
    const [isOpen, setIsOpen] = useState(false);
    const [userInitials, setUserInitials] = useState("??");

    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn) {
                try {
                    const token = window.localStorage.getItem("token");
                    const userData = await postLogin(token);
                    
                    if (userData && userData.username) {
                        const initials = userData.username.slice(0, 2).toUpperCase();
                        console.log("Setting initials to:", initials);
                        setUserInitials(initials);
                    }
                } catch (err) {
                    console.error("Error fetching user:", err);
                    setUserInitials("??");
                }
            }
        };

        fetchUserData();
    }, [isLoggedIn]);

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
                        <Link to="/">Home</Link>
                        <Link to="/create-project">Create Project</Link>
                        <Link to="/logout">Log Out</Link>
                        <div className="user-initials">
                            {userInitials}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;