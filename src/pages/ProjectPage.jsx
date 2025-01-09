import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProject from "../hooks/use-project";
import NavBar from "../components/NavBar";
import "./ProjectPage.css";
import { useAuth } from "../hooks/use-auth";
import deleteProject from "../api/delete-project";

function ProjectPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);
  const [pledgeUsers, setPledgeUsers] = useState({});

  // Fetch usernames for pledges
  useEffect(() => {
    if (project?.pledges) {
      // Log a sample pledge to see its structure
      console.log("Sample pledge data:", project.pledges[0]);

      // Try to get usernames directly from pledge data
      const userMap = {};
      project.pledges.forEach((pledge) => {
        if (!pledge.anonymous && pledge.supporter_username) {
          userMap[pledge.supporter] = pledge.supporter_username;
        }
      });

      setPledgeUsers(userMap);
    }
  }, [project]);

  // Add delete handler
  const handleDelete = async () => {
    const confirmed = window.confirm
    try {
      await deleteProject(id);
      navigate("/");
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // This will format as DD/MM/YYYY
  };

  // Format number with commas
  const formatAmount = (amount) => {
    return amount.toLocaleString("en-US");
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

  console.log(project.userMap[0]);

  return (
    <div className="page-container">
      <NavBar />
      <div className="project-page">
        <div className="project-header">
          <h1>{project.title}</h1>
          <p className="project-date">
            Created:{" "}
            {project.date_created
              ? formatDate(project.date_created)
              : "Loading..."}
          </p>
        </div>

        <div className="project-content">
          <div className="project-main">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            )}
            <div className="project-description">
              <h2>{project.description}</h2>
            </div>
          </div>

          <div className="project-stats">
            <div className="stats-card">
              <h3>Campaign Status</h3>
              <p className="status">{project.is_open ? "Open" : "Closed"}</p>

              <div className="funding-stats">
                <div className="stat-item">
                  <h4>Total Pledged</h4>
                  <p>
                    $
                    {formatAmount(
                      project.pledges ? calculateTotal(project.pledges) : 0
                    )}
                  </p>
                </div>
                <div className="stat-item">
                  <h4>Goal</h4>
                  <p>${formatAmount(project.goal)}</p>
                </div>
                <div className="stat-item">
                  <h4>Still Needed</h4>
                  <p>
                    $
                    {formatAmount(
                      calculateRemaining(
                        project.pledges ? calculateTotal(project.pledges) : 0,
                        project.goal
                      )
                    )}
                  </p>
                </div>
              </div>

              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${calculateProgress(
                        project.pledges ? calculateTotal(project.pledges) : 0,
                        project.goal
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  {calculateProgress(
                    project.pledges ? calculateTotal(project.pledges) : 0,
                    project.goal
                  ).toFixed(1)}
                  % funded
                </p>
              </div>

              <Link to={`/project/${id}/pledge`} className="pledge-button">
                Make a Pledge
              </Link>
            </div>
          </div>
        </div>

        <div className="pledges-section">
          <h2>Pledges</h2>
          <div className="pledges-list">
            {project.pledges.map((pledgeData, key) => {
              console.log("Full pledge data:", pledgeData); // Debug log

              return (
                <div key={key} className="pledge-card">
                  <p className="pledge-amount">
                    ${formatAmount(pledgeData.amount)}
                  </p>
                  <p className="pledge-user">
                    from{" "}
                    {pledgeData.anonymous
                      ? "Anonymous"
                      : project.userMap[pledgeData.supporter] || "Unknown"}
                  </p>
                  {pledgeData.comment && (
                    <p className="pledge-comment">{pledgeData.comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add delete button */}
        {auth && (auth.id === project.owner_id || auth.is_superuser) && (
          <div className="delete-container">
            <button className="delete-button" onClick={handleDelete}>
              Delete Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
