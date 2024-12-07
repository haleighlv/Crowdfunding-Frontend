import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import "./HomePage.css";

function HomePage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/`);
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="page-container">
            <NavBar />
            <main className="home-container">
                <div className="home-hero">
                    <h1>Welcome to HandUp</h1>
                    <p>Supporting each other to access mental health care</p>
                    <Link to="/signup">
                        <button>Get Started</button>
                    </Link>
                </div>
                <div className="project-container">
                    <h2>Featured Projects</h2>
                    <div id="project-list">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <Link to={`/project/${project.id}`}>
                                    {project.image && (
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="project-image"
                                        />
                                    )}
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <p>Goal: ${project.goal.toLocaleString()}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;