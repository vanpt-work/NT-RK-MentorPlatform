import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";

import { PATH } from "@/common/constants/paths";
import { useAuthContext } from "@/common/context/auth-context";
import type { Role } from "@/common/types/auth";

import LoadingSpinner from "../loading-spinner";

const PermissionRoute = ({
    children,
    role,
}: {
    children: JSX.Element;
    role: Role;
}) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner />;
    }
    return user?.role == role ? (
        children
    ) : (
        <Navigate to={PATH.Forbidden} state={{ from: location }} replace />
    );
};

export default PermissionRoute;
