import type { AddCommentFormSchema } from "../types/addCommentForm";
import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice'


const addCommentFormData: AddCommentFormSchema = {
    text: 'some_text',
    error: undefined
};

describe('addCommentFormSlice.test', () => {

    // simple reducers
    test('should setText work', () => {
        const state: DeepPartial<AddCommentFormSchema> = {
            text: '',
            error: undefined
        };
        expect(
            addCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText('some_text'))
        ).toEqual(addCommentFormData)
    });
});
