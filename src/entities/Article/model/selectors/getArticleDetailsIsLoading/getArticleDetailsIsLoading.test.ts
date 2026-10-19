import { getArticleDetailsIsLoading } from "./getArticleDetailsIsLoading"
import type { StateSchema } from "@/app/providers/StoreProvider"

describe('getArticleDetailsIsLoading.test', () => {

    test('should return articleDetails isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true
            }
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(true)
    });
    test('empty articleDetails', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {}
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(undefined)
    })
});