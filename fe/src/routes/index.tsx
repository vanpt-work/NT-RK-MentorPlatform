import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "@/common/components/routes/PrivateRoute";
import ManageCourseCategoryPage from "@/modules/AdminPage/ManageCourseCategoryPage";
import ManageUsersPage from "@/modules/AdminPage/ManageUsersPage";
import MentorApprovalsPage from "@/modules/AdminPage/MentorApprovalsPage";
import HomePage from "@/modules/HomePage";
import Login from "@/modules/LoginPage";
import OTPVerificationPage from "@/modules/OTPVerificationPage";
import ForgotPassword from "@/modules/PasswordResetPage";

import MainLayout from "../layouts/main-layout";
import ProfilePage from "../modules/ProfilePage";
import Register from "../modules/RegisterPage";

const router = createBrowserRouter([
    // Protected routes with layout
    {
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/home",
                element: <div>Home</div>,
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
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "manage-users",
                element: <ManageUsersPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "manage-course-categories",
                element: <ManageCourseCategoryPage />,
            },
            {
                path: "mentor-approvals",
                element: <MentorApprovalsPage />,
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
