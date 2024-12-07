import "./LoginPage.css";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";

function LoginPage() {
    return (
        <div className="login-container">
            <NavBar />
            <div className="login-form">
                <h1>Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;