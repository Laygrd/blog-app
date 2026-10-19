import type { StateSchema } from "@/app/providers/StoreProvider"
import { getArticlesPageIsLoading } from "./getArticlesPageIsLoading"


describe('getArticlesPageIsLoading.test', () => {

    test('should return articlesPage isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                isLoading: true
            }
        };
        expect(getArticlesPageIsLoading(state as StateSchema)).toBe(true)
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageIsLoading(state as StateSchema)).toBe(false)
    })
});
