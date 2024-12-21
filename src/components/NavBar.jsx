import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        HandUp
      </Link>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        {auth ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/create-project">Create Project</Link>
            <Link to="/logout">Log Out</Link>
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
