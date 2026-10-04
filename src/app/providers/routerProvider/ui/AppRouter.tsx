import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "widgets/PageLoader";
import { RequireAuth } from "./RequireAuth";
import { RequireRoles } from "./RequireRoles";
import { AppRouteProps, RouterConfig } from "../lib/routerConfig";


const AppRouter = () => {
    const renderWithAuthWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly 
                    ? <RequireAuth>
                        <RequireRoles roles={route.roles}>
                            {element} 
                        </RequireRoles>
                    </RequireAuth> 
                    : element
                }
            />
        )
    }, []);

    return (
        <Routes>
            {Object.values(RouterConfig).map(renderWithAuthWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);