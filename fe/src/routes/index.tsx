import { Navigate, createBrowserRouter } from "react-router-dom";

import AuthRedirectRoute from "@/common/components/routes/AuthRedirectRoute";
import MentorApplicationRoute from "@/common/components/routes/MentorApplicationRoute";
import PermissionRoute from "@/common/components/routes/PermissionRoute";
import { Role } from "@/common/types/auth";
import MentorLayout from "@/layouts/mentor-layout";
import ManageCourseCategoryPage from "@/modules/AdminPage/ManageCourseCategoryPage";
import ManageUsersPage from "@/modules/AdminPage/ManageUsersPage";
import MentorApprovalsPage from "@/modules/AdminPage/MentorApprovalsPage";
import HomePage from "@/modules/HomePage";
import Login from "@/modules/LoginPage";
import ApplicationStatusPage from "@/modules/MentorPage/ApplicationStatusPage";
import RequestApplicationPage from "@/modules/MentorPage/RequestApplicationPage";
import OTPVerificationPage from "@/modules/OTPVerificationPage";

import MainLayout from "../layouts/main-layout";
import ForgotPassword from "../modules/PasswordResetPage";
import ProfilePage from "../modules/ProfilePage";
import Register from "../modules/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <AuthRedirectRoute>
                <Login />
            </AuthRedirectRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <AuthRedirectRoute>
                <Register />
            </AuthRedirectRoute>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <AuthRedirectRoute>
                <ForgotPassword />
            </AuthRedirectRoute>
        ),
    },
    {
        path: "/verify-otp",
        element: (
            <AuthRedirectRoute>
                <OTPVerificationPage />
            </AuthRedirectRoute>
        ),
    },
    {
        path: "/",
        element: (
            <AuthRedirectRoute>
                <HomePage />
            </AuthRedirectRoute>
        ),
    },
    {
        path: "/admin",
        element: (
            <PermissionRoute role={Role.Admin}>
                <MainLayout />
            </PermissionRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <div>Dashboard</div>,
            },
            {
                path: "manage-users",
                element: <ManageUsersPage />,
            },
            {
                path: "manage-courses",
                element: <div>Manage Courses</div>,
            },
            {
                path: "manage-course-categories",
                element: <ManageCourseCategoryPage />,
            },
            {
                path: "mentor-approvals",
                element: <MentorApprovalsPage />,
            },
            {
                path: "resources",
                element: <div>Resources</div>,
            },
            {
                path: "messages",
                element: <div>Messages</div>,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "/mentor",
        element: (
            <PermissionRoute role={Role.Mentor}>
                <MentorApplicationRoute>
                    <MainLayout />
                </MentorApplicationRoute>
            </PermissionRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <div>Dashboard</div>,
            },
            {
                path: "resources",
                element: <div>Resources</div>,
            },
            {
                path: "availability",
                element: <div>Availability</div>,
            },
            {
                path: "courses",
                element: <div>Courses</div>,
            },
            {
                path: "manage-courses",
                element: <div>Manage Courses</div>,
            },
            {
                path: "messages",
                element: <div>Messages</div>,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "/mentor",
        element: (
            <PermissionRoute role={Role.Mentor}>
                <MentorApplicationRoute>
                    <MentorLayout />
                </MentorApplicationRoute>
            </PermissionRoute>
        ),
        children: [
            {
                path: "applications/status",
                element: <ApplicationStatusPage />,
            },
            {
                path: "request-application",
                element: <RequestApplicationPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "/learner",
        element: (
            <PermissionRoute role={Role.Learner}>
                <MainLayout />
            </PermissionRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <div>Dashboard</div>,
            },
            {
                path: "find-mentors",
                element: <div>Find Mentors</div>,
            },
            {
                path: "sessions",
                element: <div>Sessions</div>,
            },
            {
                path: "my-progress",
                element: <div>My Progress</div>,
            },
            {
                path: "resources",
                element: <div>Resources</div>,
            },
            {
                path: "messages",
                element: <div>Messages</div>,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export default router;
