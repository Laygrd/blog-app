import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageOrder } from "./getArticlesPageOrder"


describe('getArticlesPageSearch.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                order: 'asc'
            }
        };
        expect(getArticlesPageOrder(state as StateSchema)).toBe('asc');
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageOrder(state as StateSchema)).toBe('asc');
    })
});