import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true,
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted", credentials);

        try {
            const token = window.localStorage.getItem("token");
            if (!token) {
                console.error("User not logged in");
                navigate("/login");
                return;
            }

            // Make the API call directly
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/projects/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    },
                    body: JSON.stringify({
                        title: credentials.title,
                        description: credentials.description,
                        goal: Number(credentials.goal),
                        image: credentials.image,
                        is_open: credentials.is_open
                    }),
                }
            );

            const data = await response.json();
            console.log("Server response:", data);

            if (!response.ok) {
                throw new Error(JSON.stringify(data));
            }

            navigate("/");

        } catch (err) {
            console.error("Error details:", err);
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
            <div className="form-item">
                <label htmlFor="is_open">
                    <input
                        type="checkbox"
                        id="is_open"
                        checked={credentials.is_open}
                        onChange={handleChange}
                    />
                    Project is Open
                </label>
            </div>
            <button type="submit">Create Project</button>
        </form>
    );
}

export default ProjectForm;