import { AboutPage } from "pages/AboutPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticleEditPage } from "pages/ArticleEditPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";
import { AppRoutes, RouterPaths } from "shared/config/router/routerVars";

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

export const RouterConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RouterPaths.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RouterPaths.about,
        element: <AboutPage />
    },
    [AppRoutes.PROFILES]: {
        path: `${RouterPaths.profiles}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RouterPaths.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RouterPaths.article_details}:id`,
        element: <ArticleDetailsPage/>,
        authOnly: true,
    },
    [AppRoutes.ARTICLES_EDIT]: {
        path: `${RouterPaths.articles_edit}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES_CREATE]: {
        path: `${RouterPaths.articles_create}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RouterPaths.not_found,
        element: <NotFoundPage />
    },
}