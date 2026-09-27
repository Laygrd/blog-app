import { getUserAuthData, getUserRoles, UserRole } from "entities/User";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RouterPaths } from "shared/config/router/routerVars";


export interface RequireRolesProps {
    children: JSX.Element;
    roles?: UserRole[];
}

function RequireRoles({ children, roles }: RequireRolesProps) {
    let location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        })
    }, [roles, userRoles]);

    if (!hasRequiredRoles) {
        return <Navigate to={RouterPaths.forbidden} state={{ from: location }} replace />;
    }

    return children;
}

export { RequireRoles };