import { useNavigate, useParams } from "react-router-dom";

function DeleteProjectButton() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const token = window.localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete project");
            }

            navigate("/");
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return <button onClick={handleDelete}>Delete Project</button>;
}

export default DeleteProjectButton; 