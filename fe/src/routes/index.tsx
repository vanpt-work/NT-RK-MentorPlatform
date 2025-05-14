import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import ProfilePage from "@/modules/ProfilePage";
import Login from "@/modules/LoginPage";
import Register from "@/modules/RegisterPage";
import ForgotPassword from "@/modules/PasswordResetPage";
import HomePage from "@/modules/HomePage";

const router = createBrowserRouter([
  // Protected routes with layout
  {
    path: "/home",
    element: <MainLayout />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
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
  },
]);

export default router;
