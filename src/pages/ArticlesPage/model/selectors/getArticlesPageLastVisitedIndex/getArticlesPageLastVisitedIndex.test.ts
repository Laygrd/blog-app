import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageLastVisitedIndex } from "./getArticlesPageLastVisitedIndex"


describe('getArticlesLastVisitedIndex.test', () => {

    test('should return articlesPage lastVisitedIndex', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                lastVisitedIndex: 4
            }
        };
        expect(getArticlesPageLastVisitedIndex(state as StateSchema)).toBe(4)
    });

    test('empty articlesPage', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageLastVisitedIndex(state as StateSchema)).toBe(undefined)
    })
});