export enum ArticleType {
    ALL = 'ALL',
    IT = "IT",
    ECONOMICS = "ECONOMICS",
    SCIENCE = "SCIENCE"
};

export enum ArticleBlockType {
    TEXT = "TEXT",
    CODE = "CODE",
    IMAGE = "IMAGE"
};

export enum ArticleListView {
    'LIST' = 'ArticleListItem_list',
    'TILE' = 'ArticleListItem_tile',
}

export enum ArticleSortField {
    CREATED = 'createdAt',
    VIEWS = 'views',
    TITLE = 'title',
}