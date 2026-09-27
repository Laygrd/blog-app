import { getUserAuthData } from "entities/User";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RouterPaths } from "shared/config/router/routerVars";

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useSelector(getUserAuthData);
    let location = useLocation();

    if (!auth) {
        return <Navigate to={RouterPaths.main} state={{ from: location }} replace />;
    }

    return children;
}

export { RequireAuth };