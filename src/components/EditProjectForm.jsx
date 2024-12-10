import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true,
    });

    useEffect(() => {
        // Fetch existing project data and set it to state
        async function fetchProject() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);
            const data = await response.json();
            setProjectData(data);
        }
        fetchProject();
    }, [id]);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setProjectData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = window.localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error("Failed to update project");
            }

            navigate(`/project/${id}`);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields similar to ProjectForm */}
            <button type="submit">Update Project</button>
        </form>
    );
}

export default EditProjectForm; 