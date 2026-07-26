import { StateSchema } from "app/providers/StoreProvider"
import { getArticleDetailsCommentsError } from "./getArticleDetailsCommentsError"


describe('getArticleDetailsCommentsError.test', () => {

    test('should return articleDetailsComments error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments:{
                    error: 'some_error',
                }
            }
        };
        expect(getArticleDetailsCommentsError(state as StateSchema)).toBe('some_error')
    });

    test('empty articleDetailsComments state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {}
        };
        expect(getArticleDetailsCommentsError(state as StateSchema)).toBe(undefined)
    })
});