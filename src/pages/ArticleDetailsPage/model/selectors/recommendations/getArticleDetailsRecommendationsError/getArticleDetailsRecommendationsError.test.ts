import { StateSchema } from "app/providers/StoreProvider"
import { getArticleDetailsRecommendationsError } from "./getArticleDetailsRecommendationsError"


describe('getArticleDetailsRecommendationsError.test', () => {

    test('should return articleDetailsRecommendations Error ', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                recommendations: {
                    error: 'error'
                }
            }
        };
        expect(getArticleDetailsRecommendationsError(state as StateSchema)).toBe('error')
    });

    test('empty articleDetailsPage state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {}
        };
        expect(getArticleDetailsRecommendationsError(state as StateSchema)).toBe(undefined)
    })
});