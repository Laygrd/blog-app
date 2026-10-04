import { getArticleDetailsData } from "./getArticleDetailsData"
import type { StateSchema } from "app/providers/StoreProvider"

describe('getArticleDetailsData.test', () => {

    test('should return articleDetails data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: {title: 'some_title'}
            }
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual({title: 'some_title'})
    });
    test('empty articleDetails', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {}
        };
        expect(getArticleDetailsData(state as StateSchema)).toBe(undefined)
    })
});