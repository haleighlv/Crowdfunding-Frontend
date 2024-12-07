import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postUser from "../api/post-user.js";

function SignupForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    if (credentials.username && credentials.password && credentials.email) {
      try {
        await postUser(
          credentials.username,
          credentials.password,
          credentials.email
        );
        navigate("/login");
      } catch (error) {
        try {
          const errorData = JSON.parse(error.message);
          setErrors(errorData);
        } catch {
          setErrors({ general: error.message });
        }
      }
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
