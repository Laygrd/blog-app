import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageHasMore } from "./getArticlesPageHasMore"


describe('getArticlesPageHasMore.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                hasMore: false
            }
        };
        expect(getArticlesPageHasMore(state as StateSchema)).toBe(false)
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageHasMore(state as StateSchema)).toBe(undefined)
    })
});