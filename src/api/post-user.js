async function postUser(username, password, email) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    
    try {
        console.log("Making request to:", url);
        console.log("Request data:", {
            username,
            password,
            email
        });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "email": email,
            }),
        });

        const responseData = await response.json();
        
        console.log("Response status:", response.status);
        console.log("Response data:", responseData);

        if (!response.ok) {
            throw new Error(JSON.stringify(responseData));
        }

        return responseData;
    } catch (error) {
        console.error("Error details:", error);
        throw error;
    }
}

export default postUser;