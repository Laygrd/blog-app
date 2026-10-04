import type { StateSchema } from "app/providers/StoreProvider"
import { ArticleListView } from "entities/Article";
import { getArticlesPageView } from "./getArticlesPageView"


describe('getArticlesPageView.test', () => {

    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                view: ArticleListView.TILE
            }
        };
        expect(getArticlesPageView(state as StateSchema)).toBe(ArticleListView.TILE)
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageView(state as StateSchema)).toBe(ArticleListView.LIST)
    })
});
