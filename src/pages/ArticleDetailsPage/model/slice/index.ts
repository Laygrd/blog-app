import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { articleDetailsRecommendationsReducer } from "./ArticleDetailsRecommendationsSlice";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsRecommendationsReducer,
})