async function deleteProject(projectId) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting project ${projectId}`);
        }

        return true;
    } catch (error) {
        console.error("Delete project error:", error);
        throw error;
    }
}

export default deleteProject;