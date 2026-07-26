import { StateSchema } from "app/providers/StoreProvider";

export const getArticleDetailsRecommendationsError = (state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.error;
}