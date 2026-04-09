import { Route, Routes } from "react-router-dom";
import { AppRouteProps, RouterConfig } from "../lib/routerConfig";
import { memo, Suspense, useCallback } from "react";
import { PageLoader } from "widgets/PageLoader";
import { RequireAuth } from "./RequireAuth";

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
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
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