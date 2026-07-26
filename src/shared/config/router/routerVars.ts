export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILES = 'profiles',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLES_EDIT = 'articles_edit',
    ARTICLES_CREATE = 'articles_create',
    NOT_FOUND = 'not_found'
};

export const RouterPaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILES]: '/profiles/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
    [AppRoutes.ARTICLES_EDIT]: '/articles/:id/edit',
    [AppRoutes.ARTICLES_CREATE]: '/articles/new',
    [AppRoutes.NOT_FOUND]: '*',
};
