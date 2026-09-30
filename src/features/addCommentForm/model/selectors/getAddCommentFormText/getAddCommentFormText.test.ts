import { getAddCommentFormText } from "./getAddCommentFormText"
import { StateSchema } from "app/providers/StoreProvider"

describe('getAddCommentFormText.test', () => {


    test('should return addCommentForm text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'text'
            }
        };
        expect(getAddCommentFormText(state as StateSchema)).toEqual('text')
    });
    test('empty addCommentForm state', () => {
        const state: DeepPartial<StateSchema> = {   
            addCommentForm: {}
        };
        expect(getAddCommentFormText(state as StateSchema)).toBe('')
    })
});