import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

import { Article } from "entities/Article";
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";


const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article: Article) => article.id,
})

export const getArticleDetailsRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
)

const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendations',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        ids: [],
        entities: {},
        error: undefined,
        isLoading: false,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
    },
});

export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;