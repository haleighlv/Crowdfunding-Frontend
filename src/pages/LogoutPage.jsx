import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

function LogoutPage() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(() => {
        // Clear the token from localStorage
        window.localStorage.removeItem("token");
        // Clear the auth context
        setAuth(null);
        // Redirect to home page
        navigate("/");
    }, [navigate, setAuth]);

    return null;
}

export default LogoutPage; 