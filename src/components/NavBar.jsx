import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  return (
    <div>
      <header className="navbar">
      <nav>
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
          ) : (
          <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
              <Link to="/project">Create project</Link>  
          </div>
        )}
        </nav>
        </header>
      <Outlet />
    </div>
  );
}

export default NavBar;