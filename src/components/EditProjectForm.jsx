import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectForm(props) {
  const { project } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: project.title,
    description: project.description,
    goal: project.goal,
    image: project.image,
    is_open: project.is_open,
  });
    const VALID = true;
    const required = () => (true);

  const [errors, setErrors] = useState({
    title: VALID,
    description: VALID,
    goal: VALID,
    image: VALID,
  });

//   const validators = {
//     title: required("Title is required."),
//     description: required("Description is required."),
//     goal: (value) =>
//       required("Goal is required.")(value) ||
//       positiveInteger("Goal must be a positive integer.")(value),
//     image: (value) =>
//       required("Image URL is required.")(value) ||
//       urlValid("Image must be a valid URL.")(value) ||
//       maxLength("Image URL must be 200 characters or less.", 200)(value),
//   };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
    //   [id]: validators[id] ? validators[id](value) : VALID,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const token = window.localStorage.getItem("token");
        console.log("projectData", projectData)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      navigate(`/project/${id}`);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={projectData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={projectData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          value={projectData.goal}
          onChange={handleChange}
        />
        {errors.goal && <p className="error">{errors.goal}</p>}
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={projectData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <div className="checkbox-wrapper">
        <label htmlFor="isOpen">
          <input
            type="checkbox"
            id="isOpen"
            checked={projectData.isOpen}
            onChange={handleChange}
          />
          Open for pledges
        </label>
      </div>
      <button type="submit">Update Project</button>
    </form>
  );
}

export default EditProjectForm;
