import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/use-project";
import NavBar from "../components/NavBar";

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    const [users, setUsers] = useState({});  // Store user details

    // Format date to DD/MM/YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // This will format as DD/MM/YYYY
    };

    // Format number with commas
    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US');
    };

    // Calculate total pledges
    const calculateTotal = (pledges) => {
        return pledges.reduce((total, pledge) => total + pledge.amount, 0);
    };

    // Calculate remaining amount needed
    const calculateRemaining = (total, goal) => {
        const remaining = goal - total;
        return remaining > 0 ? remaining : 0;
    };

    // Calculate progress percentage
    const calculateProgress = (total, goal) => {
        return Math.min((total / goal) * 100, 100);
    };

    // Fetch user details for each pledge
    useEffect(() => {
        if (project && project.pledges) {
            project.pledges.forEach(async (pledge) => {
                if (!pledge.anonymous && !users[pledge.supporter]) {
                    try {
                        console.log("Fetching user for supporter ID:", pledge.supporter);
                        const token = window.localStorage.getItem("token");
                        const response = await fetch(
                            `${import.meta.env.VITE_API_URL}/users/${pledge.supporter}/`,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Token ${token}`
                                }
                            }
                        );
                        const data = await response.json();
                        console.log("User data received:", data);
                        
                        if (data && data.username) {
                            setUsers(prevUsers => ({
                                ...prevUsers,
                                [pledge.supporter]: data
                            }));
                        } else {
                            console.error("Invalid user data received:", data);
                        }
                    } catch (err) {
                        console.error("Error fetching user:", err);
                    }
                }
            });
        }
    }, [project, users]);

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }
    
    return (
        <div>
            <NavBar />
            <h2>{project.title}</h2>
            {project.image && (
                <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        marginBottom: '20px'
                    }}
                />
            )}
            <h3>Created at: {formatDate(project.date_created)}</h3>
            <p>{project.description}</p>
            <h3>Status: {project.is_open ? "Open" : "Closed"}</h3>
            
            {/* Progress section */}
            <div>
                <h3>Total Pledged: ${formatAmount(project.pledges ? calculateTotal(project.pledges) : 0)}</h3>
                <h3>Goal: ${formatAmount(project.goal)}</h3>
                <h3>Still Needed: ${formatAmount(calculateRemaining(
                    project.pledges ? calculateTotal(project.pledges) : 0,
                    project.goal
                ))}</h3>
                
                {/* Progress bar */}
                <div style={{ 
                    width: '100%', 
                    backgroundColor: '#e0e0e0', 
                    borderRadius: '8px',
                    margin: '10px 0'
                }}>
                    <div style={{
                        width: `${calculateProgress(
                            project.pledges ? calculateTotal(project.pledges) : 0,
                            project.goal
                        )}%`,
                        backgroundColor: '#4CAF50',
                        height: '20px',
                        borderRadius: '8px',
                        transition: 'width 0.5s ease-in-out'
                    }}></div>
                </div>
                <p>{calculateProgress(
                    project.pledges ? calculateTotal(project.pledges) : 0,
                    project.goal
                ).toFixed(1)}% funded</p>
            </div>

            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                    const user = users[pledgeData.supporter];
                    return (
                        <li key={key}>
                            ${formatAmount(pledgeData.amount)} from {pledgeData.anonymous ? "Anonymous" : 
                                (user ? user.username : `Loading user...`)}
                            {pledgeData.comment && <p>Comment: {pledgeData.comment}</p>}
                        </li>
                    );
                })}
            </ul>
            <Link to={`/project/${id}/pledge`}>Make pledge</Link>
        </div>
    );
}

export default ProjectPage;