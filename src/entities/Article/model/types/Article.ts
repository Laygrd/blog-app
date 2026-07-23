import { User } from "entities/User";

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

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
};

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
};

export interface ArticleCodeBlock extends ArticleBlockBase{
    type: ArticleBlockType.CODE;
    code: string;
};

export interface ArticleImageBlock extends ArticleBlockBase{
    type: ArticleBlockType.IMAGE
    src: string;
    title: string;
};

export type ArticleBlock = ArticleTextBlock | ArticleCodeBlock | ArticleImageBlock;

export interface Article {
    id: string,
    title: string,
    subtitle: string,
    img: string,
    views: number,
    user: User,
    createdAt: string,
    type: ArticleType[],
    blocks: ArticleBlock[]
}

export enum ArticleListView {
    'LIST' = 'ArticleListItem_list',
    'TILE' = 'ArticleListItem_tile',
}

export enum ArticleSortField {
    CREATED = 'createdAt',
    VIEWS = 'views',
    TITLE = 'title',
}