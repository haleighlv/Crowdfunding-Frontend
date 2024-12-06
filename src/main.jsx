import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PledgePage from "./pages/PledgePage.jsx"
import CreateProjectPage from "./pages/CreateProjectPage.jsx";

import { AuthProvider } from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/project/:id",
        element: <ProjectPage />,
    },
    {
        path: "/project/:id/pledge",
        element: <PledgePage />,
    },
    {
        path: "/create-project",
        element: <CreateProjectPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);