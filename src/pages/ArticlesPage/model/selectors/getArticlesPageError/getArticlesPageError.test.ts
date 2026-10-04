import type { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageError } from "./getArticlesPageError"


describe('getArticlesPageError.test', () => {

    test('should return articlesPage error', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                error: 'some_error'
            }
        };
        expect(getArticlesPageError(state as StateSchema)).toBe('some_error')
    });

    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageError(state as StateSchema)).toBe(undefined)
    })
});
