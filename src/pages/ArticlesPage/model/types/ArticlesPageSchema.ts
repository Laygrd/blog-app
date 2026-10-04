import type { EntityState } from "@reduxjs/toolkit";
import { type Article, ArticleListView, ArticleSortField, ArticleType } from "entities/Article";
import type { SortOrder } from "shared/types";


export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    lastVisitedIndex: number; // used for scroll restortion in Virtuoso
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
};
