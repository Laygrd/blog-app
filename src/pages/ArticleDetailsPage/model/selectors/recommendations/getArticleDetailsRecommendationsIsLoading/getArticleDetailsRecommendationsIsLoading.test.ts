import { StateSchema } from "app/providers/StoreProvider"
import { getArticleDetailsRecommendationsIsLoading } from "./getArticleDetailsRecommendationsIsLoading"


describe('getArticleDetailsRecommendationsIsLoading.test', () => {

    test('should return articleDetailsRecommendations Error ', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                recommendations: {
                    isLoading: true
                }
            }
        };
        expect(getArticleDetailsRecommendationsIsLoading(state as StateSchema)).toBe(true)
    });

    test('empty articleDetailsPage state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {}
        };
        expect(getArticleDetailsRecommendationsIsLoading(state as StateSchema)).toBe(undefined)
    })
});