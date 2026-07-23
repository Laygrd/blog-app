import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageSort } from "./getArticlesPageSort"
import { ArticleSortField } from "entities/Article";


describe('getArticlesPageSort.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                sort: ArticleSortField.TITLE
            }
        };
        expect(getArticlesPageSort(state as StateSchema)).toBe('title');
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageSort(state as StateSchema)).toBe(ArticleSortField.CREATED);
    })
});