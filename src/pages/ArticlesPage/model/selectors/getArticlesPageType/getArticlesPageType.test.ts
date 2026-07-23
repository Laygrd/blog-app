import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageType } from "./getArticlesPageType"
import { ArticleSortField, ArticleType } from "entities/Article";


describe('getArticlesPageType.test', () => {

    test('should return articlesPage type', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                type: ArticleType.ECONOMICS
            }
        };
        expect(getArticlesPageType(state as StateSchema)).toBe(ArticleType.ECONOMICS);
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageType(state as StateSchema)).toBe(ArticleType.ALL);
    })
});