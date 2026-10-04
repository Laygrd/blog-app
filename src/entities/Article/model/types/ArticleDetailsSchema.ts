import type { Article } from "./Article";

export interface ArticleDetailsSchema {
    data?: Article;
    error?: string;
    isLoading: boolean
}