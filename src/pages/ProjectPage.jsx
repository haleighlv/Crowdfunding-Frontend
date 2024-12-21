import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/use-project";
import NavBar from "../components/NavBar";
import "./ProjectPage.css";
import { useAuth } from "../hooks/use-auth";

function ProjectPage() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);
  const [users, setUsers] = useState({});
  const { auth } = useAuth();
  const [ownerUsername, setOwnerUsername] = useState("Loading...");

  // Debug log for project data
  useEffect(() => {
    console.log("Current project:", project);
    console.log("Project owner ID:", project?.owner);
  }, [project]);

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

  // Fetch user details for pledges only
  useEffect(() => {
    const fetchUser = async (userId) => {
      console.log("Attempting to fetch user:", userId);
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.username) {
          setUsers((prevUsers) => ({
            ...prevUsers,
            [userId]: data,
          }));
        }
      } catch (err) {
        console.error(`Error fetching user ${userId}:`, err);
      }
    };

    if (project) {
      // Only fetch pledge
    }
  }, [project]);

  // Fetch project owner's username with token
  useEffect(() => {
    const fetchOwner = async () => {
      if (project?.owner) {
        try {
          const token = window.localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/projects/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );

          const data = await response.json();
          if (data && data.owner_username) {
            setOwnerUsername(data.owner_username);
          } else {
            setOwnerUsername("Unknown");
          }
        } catch (err) {
          setOwnerUsername("Unknown");
        }
      }
    };

    if (project) {
      fetchOwner();
    }
  }, [project]);

  // Debug log to see project data
  useEffect(() => {
    console.log("Project data:", project);
  }, [project]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="page-container">
      <NavBar />
      <div className="project-page">
        <div className="project-header">
          <h1>{project.title}</h1>
          <p className="project-date">
            Created: {formatDate(project.date_created)}
          </p>
          <p className="project-owner">
            Created by: {project?.owner_username || "Unknown"}
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
              const user = users[pledgeData.supporter];
              return (
                <div key={key} className="pledge-card">
                  <p className="pledge-amount">
                    ${formatAmount(pledgeData.amount)}
                  </p>
                  <p className="pledge-user">
                    from{" "}
                    {pledgeData.anonymous
                      ? "Anonymous"
                      : user
                      ? user.username
                      : "Loading user..."}
                  </p>
                  {pledgeData.comment && (
                    <p className="pledge-comment">{pledgeData.comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
