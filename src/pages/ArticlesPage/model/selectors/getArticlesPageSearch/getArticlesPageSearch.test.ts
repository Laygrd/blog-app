import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageSearch } from "./getArticlesPageSearch"


describe('getArticlesPageSearch.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                search: 'someTitle'
            }
        };
        expect(getArticlesPageSearch(state as StateSchema)).toBe('someTitle');
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageSearch(state as StateSchema)).toBe('');
    })
});