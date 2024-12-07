import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProject from "../hooks/use-project";
import NavBar from "../components/NavBar";
import "./PledgePage.css";

function PledgePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, error } = useProject(id);

    // Form state
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        anonymous: false
    });

    // Loading and error states for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        // Check if user is logged in
        const token = window.localStorage.getItem("token");
        if (!token) {
            setSubmitError("Please log in to make a pledge");
            navigate("/login");
            return;
        }

        // Log the data we're about to send
        console.log("Sending pledge data:", {
            project: id,
            amount: Number(formData.amount),
            comment: formData.comment,
            anonymous: formData.anonymous,
        });

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/pledges/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    },
                    body: JSON.stringify({
                        project: id,
                        amount: Number(formData.amount),
                        comment: formData.comment,
                        anonymous: formData.anonymous,
                    }),
                }
            );

            const data = await response.json();
            console.log("Server response:", data);

            if (!response.ok) {
                throw new Error(JSON.stringify(data));
            }

            navigate(`/project/${id}`);

        } catch (err) {
            console.error("Error details:", err);
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div className="page-container">
            <NavBar />
            <div className="pledge-container">
                <h1>Make a Pledge</h1>
                {submitError && <p style={{ color: "red" }}>{submitError}</p>}
                <div className="pledge-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="amount">Amount:</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                min="1"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="comment">Comment:</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="anonymous"
                                    checked={formData.anonymous}
                                    onChange={handleChange}
                                />
                                Make pledge anonymous
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="pledge-button">
                            {isSubmitting ? "Submitting..." : "Submit Pledge"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PledgePage;