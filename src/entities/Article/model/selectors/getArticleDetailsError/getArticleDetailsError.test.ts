import { getArticleDetailsError } from "./getArticleDetailsError"
import type { StateSchema } from "app/providers/StoreProvider"

describe('getArticleDetailsError.test', () => {

    test('should return articleDetails error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error'
            }
        };
        expect(getArticleDetailsError(state as StateSchema)).toBe('error')
    });
    test('empty articleDetails', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {}
        };
        expect(getArticleDetailsError(state as StateSchema)).toBe(undefined)
    })
});