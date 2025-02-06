import "./EditProjectPage.css";
import EditProjectForm from "../components/EditProjectForm";
import NavBar from "../components/NavBar";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProject from "../hooks/use-project";
import { useEffect } from "react";

function EditProjectPage() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

    // Debug log to see project data
    useEffect(() => {
      console.log("Project data:", project);
    }, [project]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>{error.message}</p>;
    }
  
    // Ensure project exists before rendering
    if (!project) {
      return <p>Project not found</p>;
    }
  
  return (
    <div className="edit-project-page">
      <NavBar />
      <div className="edit-project-form">
        <h1>Edit project</h1>
        <EditProjectForm project={project} />
      </div>
    </div>
  );
}

export default EditProjectPage;
