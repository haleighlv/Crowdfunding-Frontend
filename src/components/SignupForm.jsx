import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postUser from "../api/post-user.js";

function SignupForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    if (formData.username && formData.password && formData.email) {
      try {
        
        const data = await postUser(formData);
        console.log("Signup successful:", data);
        navigate("/login");
      } catch (err) {
        console.error("Error during signup:", err);
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
            {errors.username && <p className="error-message">{errors.username}</p>}
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
