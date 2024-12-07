import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postProject from "../api/post-project.js";

function ProjectForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
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
        if (credentials.title && credentials.description && credentials.goal && credentials.image) {
            try {
                // Check if user is logged in
                const token = window.localStorage.getItem("token");
                if (!token) {
                    console.error("User not logged in");
                    navigate("/login");
                    return;
                }

                // Log the data being sent
                console.log("Sending project data:", credentials);
                
                const response = await postProject(
                    credentials.title,
                    credentials.description,
                    credentials.goal,
                    credentials.image,
                );
                
                console.log("Project creation response:", response);
                navigate("/");
            } catch (error) {
                console.error("Error creating project:", error.message);
                // You might want to show this error to the user
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="goal">Goal:</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="Enter goal"
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    placeholder="Enter link to image"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Create Project</button>
        </form>
    );
}

export default ProjectForm;