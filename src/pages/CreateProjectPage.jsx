import NavBar from "../components/NavBar";
import ProjectForm from "../components/ProjectForm";
import "./CreateProjectPage.css";

function CreateProjectPage() {
    return (
        <div className="create-project-container">
            <NavBar />
            <div className="project-form">
                <h1>Create Project</h1>
                <ProjectForm />
            </div>
        </div>
    );
}

export default CreateProjectPage;