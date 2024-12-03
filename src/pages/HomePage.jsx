import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "../pages/HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();
if (isLoading) {
    return (<p>loading...</p>)
}

if (error) {
    return (<p>{error.message}</p>)
}
    
    return (
        <div className="home-container">
            <div className="home-hero">
            <h1 className="home-heading">Give someone a handup</h1>
                <p className="home-description">Supporting each other to access mental health care</p>
                <button>Get started</button>
                <button>Learn more</button>
            </div>
            <div className="project-home">
                <h2 className="project-heading">Current Projects</h2>
            <div id="project-list">
                {projects.map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
            })}
                </div>
            </div>
        </div>
    )
};

export default HomePage;