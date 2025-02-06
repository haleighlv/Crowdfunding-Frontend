async function deleteProject(projectId,token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            }
        });

    if (!response.ok) {
        const fallbackError = `Error deleting project`;
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return true;
}

export default deleteProject;