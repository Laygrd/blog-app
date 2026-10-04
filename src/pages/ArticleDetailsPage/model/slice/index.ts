import { combineReducers } from "@reduxjs/toolkit";
import type { ArticleDetailsPageSchema } from "../types/ArticleDetailsPageSchema";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { articleDetailsRecommendationsReducer } from "./ArticleDetailsRecommendationsSlice";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsRecommendationsReducer,
});
