import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageNumber } from "./getArticlesPageNumber"


describe('getArticlesPageNumber.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                page: 2
            }
        };
        expect(getArticlesPageNumber(state as StateSchema)).toBe(2);
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageNumber(state as StateSchema)).toBe(1);
    })
});