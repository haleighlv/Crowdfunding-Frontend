import "./EditProjectPage.css";
import EditProjectForm from "../components/EditProjectForm";
import NavBar from "../components/NavBar";

function EditProjectPage() {
  return (
    <div className="edit-project-page">
      <NavBar />
      <div className="edit-project-form">
        <h1>Edit project</h1>
        <EditProjectForm />
      </div>
    </div>
  );
}

export default EditProjectPage;