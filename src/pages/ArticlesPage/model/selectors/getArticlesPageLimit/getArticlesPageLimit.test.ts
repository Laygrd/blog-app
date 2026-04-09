import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageLimit } from "./getArticlesPageLimit"


describe('getArticlesPageLimit.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                limit: 9
            }
        };
        expect(getArticlesPageLimit(state as StateSchema)).toBe(9)
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageLimit(state as StateSchema)).toBe(4)
    })
});