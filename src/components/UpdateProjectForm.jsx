import { useState } from "react";
import updateProject from "../api/update-project";
import { useNavigate } from "react-router-dom";


/* eslint-disable react/prop-types */
function UpdateProjectForm({ project, token }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    goal: project.goal,
    image: project.image,
    isOpen: project.isOpen,
  });

  const [errors, setErrors] = useState({
    title: VALID,
    description: VALID,
    goal: VALID,
    image: VALID,
  });

  // Validators for each field
  const validators = {
    title: required("Title is required."),
    description: required("Description is required."),
    goal: (value) =>
      required("Goal is required.")(value) ||
      positiveInteger("Goal must be a positive integer.")(value),
    image: (value) =>
      required("Image URL is required.")(value) ||
      urlValid("Image must be a valid URL.")(value) ||
      maxLength("Image URL must be 200 characters or less.", 200)(value),
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validators[id] ? validators[id](value) : VALID,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields
    const newErrors = Object.keys(validators).reduce((acc, field) => {
      const error = validators[field](formData[field]);
      return { ...acc, [field]: error };
    }, {});

    setErrors(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error !== VALID);
    if (hasErrors) return;

    try {
      await updateProject(project.id, formData, token);
      alert("Project updated successfully.");
      navigate(0);
    } catch (err) {
      console.error("Error updating project:", err);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Manage Project</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          value={formData.goal}
          onChange={handleChange}
        />
        {errors.goal && <p className="error">{errors.goal}</p>}
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <div className="checkbox-wrapper">
        <label htmlFor="isOpen">
          <input
            type="checkbox"
            id="isOpen"
            checked={formData.isOpen}
            onChange={handleChange}
          />
          Open for pledges
        </label>
      </div>
      <Button type="submit">Update Project</Button>
    </form>
  );
}

export default UpdateProjectForm;