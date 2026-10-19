import { getAddCommentFormError } from "./getAddCommentFormError";
import type { StateSchema } from "@/app/providers/StoreProvider";


describe('getAddCommentFormError.test', () => {


    test('should return addCommentForm error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: ''
            }
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual('')
    });
    test('empty addCommentForm state', () => {
        const state: DeepPartial<StateSchema> = {   
            addCommentForm: {}
        };
        expect(getAddCommentFormError(state as StateSchema)).toBe(undefined)
    })
});
