async function deleteProject(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, { method: "DELETE" });

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            const fallbackError = `Error deleting ${projectId}`;

            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });

            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        return true;
    }
}

export default deleteProject;