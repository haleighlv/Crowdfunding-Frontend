import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postProject from "../api/post-project.js";
import { useAuth } from "../hooks/use-auth.js";

function ProjectForm() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

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
    const handleSubmit = (event) => {
      event.preventDefault();
      if (credentials.username && credentials.password && credentials.email) {
          postUser(
              credentials.username,
              credentials.password,
              credentials.email
          ).then((response) => {
              window.localStorage.setItem("token", response.token);
            setAuth({
              token: response.token,
            });
            navigate("/");
          });
      }
  };
  return (
    <form>
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
      <button type="submit" onClick={handleSubmit}>Signup</button>
    </form>
  );
}

export default ProjectForm;