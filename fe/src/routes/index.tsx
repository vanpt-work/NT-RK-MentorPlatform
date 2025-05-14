import { createBrowserRouter } from "react-router-dom";

// App pages
import HomePage from "@/modules/HomePage";
// Auth pages
import Login from "@/modules/LoginPage";
import ForgotPassword from "@/modules/PasswordResetPage";
import Register from "@/modules/RegisterPage";

import MainLayout from "../layouts/main-layout";

const router = createBrowserRouter([
    // Protected routes with layout
    {
        path: "/home",
        element: <MainLayout />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
]);

export default router;
