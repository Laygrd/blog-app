import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleListView, ArticleSortField } from "entities/Article";
import { ArticleType } from "entities/Article";
import { SortOrder } from "shared/types";


export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    view?: ArticleListView;
    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}