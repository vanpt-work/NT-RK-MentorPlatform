import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Auth pages
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";

// App pages
import HomePage from "../pages/home";

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
