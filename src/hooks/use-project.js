import { useState, useEffect } from "react";

import getUser from "../api/get-user";
import getProject from "../api/get-project";

export default function useProject(projectId) {
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectWithUsers = async () => {
            setIsLoading(true);
            try {
                // Here we pass the projectId to the getProject function.
                const projectData = await getProject(projectId);

                // Fetch user details for all supporters
                const uniqueUserIds = [
                    ...new Set(projectData.pledges.map((pledge) => pledge.supporter)), // [1, 3, 5]
                ];
                // [1, 3, 5]
                const users = await Promise.all(
                    uniqueUserIds.map((id) => getUser(id).catch(() => null)) // Handle missing users gracefully
                );

                // Map user IDs to usernames
                const userMap = {};
                users.forEach((user, index) => {
                    if (user) {
                        userMap[uniqueUserIds[index]] = user.username;
                    }
                });

                // Attach userMap to project
                setProject({ ...projectData, userMap });
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchProjectWithUsers();
        // This time we pass the projectId to the dependency array so that the hook will re-run if the projectId changes.
    }, [projectId]);

    return { project, isLoading, error };
}