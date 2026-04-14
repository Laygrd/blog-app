import { StateSchema } from "app/providers/StoreProvider"
import { getArticlesPageInited } from "./getArticlesPageInited"


describe('getArticlesPageInited.test', () => {

    test('should return articlesPage _inited', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                _inited: false
            }
        };
        expect(getArticlesPageInited(state as StateSchema)).toBe(false)
    });

    test('empty articlePage state', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {}
        };
        expect(getArticlesPageInited(state as StateSchema)).toBe(undefined)
    })
});