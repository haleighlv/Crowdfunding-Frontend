import NavBar from "../components/NavBar";
import SignupForm from "../components/SignupForm";
import "./SignupPage.css";

function SignupPage() {
  return (
    <div className="signup-container">
      <NavBar />
      <SignupForm />
    </div>
  );
}

export default SignupPage;
