
import { PATH } from "@/common/constants/paths";
import { useAuthContext } from "@/common/context/auth-context";
import type { Role } from "@/common/types/auth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";


const PermissionRoute = ({ children, role }: { children: JSX.Element, role: Role }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();
    if (loading) {
        return <h1>Loading.....</h1>
    }
    return user?.role == role ? children : <Navigate to={PATH.Forbidden} state={{ from: location }} replace />
}

export default PermissionRoute;