import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

function LogoutButton() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleLogout = () => {
        // Clear authentication
        localStorage.removeItem('token');
        
        // Update auth context if you're using it
        setAuth(null);
        
        // Redirect to login page
        navigate('/login', { replace: true });
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
}

export default LogoutButton; 