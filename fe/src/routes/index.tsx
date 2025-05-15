import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import ProfilePage from "@/modules/ProfilePage";
import Login from "@/modules/LoginPage";
import Register from "@/modules/RegisterPage";
import ForgotPassword from "@/modules/PasswordResetPage";
import HomePage from "@/modules/HomePage";
import ManageUsersPage from "@/modules/AdminPage/ManageUsersPage";
import OTPVerificationPage from "@/modules/OTPVerificationPage";

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
    path: "/verify-otp",
    element: <OTPVerificationPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  // Admin routes
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "manage-users",
        element: <ManageUsersPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  
//   // Mentor routes
//   {
//     path: "/mentor",
//     element: <MainLayout userRole="mentor" />,
//     children: [
//       {
//         path: "dashboard",
//         element: <DashboardPage />,
//       },
//       {
//         path: "resources",
//         element: <ResourcesPage />,
//       },
//       {
//         path: "availability",
//         element: <AvailabilityPage />,
//       },
//       {
//         path: "manage-courses",
//         element: <ManageCoursesPage />,
//       },
//       {
//         path: "messages",
//         element: <MessagesPage />,
//       },
//       {
//         path: "profile",
//         element: <ProfilePage />,
//       },
//     ],
//   },
  
//   // Learner routes
//   {
//     path: "/learner",
//     element: <MainLayout userRole="learner" />,
//     children: [
//       {
//         path: "dashboard",
//         element: <DashboardPage />,
//       },
//       {
//         path: "find-mentor",
//         element: <FindMentorPage />,
//       },
//       {
//         path: "session",
//         element: <SessionPage />,
//       },
//       {
//         path: "progress",
//         element: <ProgressPage />,
//       },
//       {
//         path: "resources",
//         element: <ResourcesPage />,
//       },
//       {
//         path: "messages",
//         element: <MessagesPage />,
//       },
//       {
//         path: "profile",
//         element: <ProfilePage />,
//       },
//     ],
//   },
]);

export default router;
