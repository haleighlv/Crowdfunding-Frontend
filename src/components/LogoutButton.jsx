import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            // Clear any auth tokens/user data from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Reset any auth state if using context/redux
            // setAuth(null); // if using context
            
            // Redirect to home or login page
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
} 