import type { Comment } from "@/entities/Comment";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { addCommentForArticle } from "./addCommentForArticle";


const comment: Comment = {
    id: '1',
    user: {id: '1', username: 'username1'},
    text: 'some comment'
}

describe('addCommentForArticle.test', () => {

    test('success send', async () => {
        const thunk = new TestAsyncThunk(
            addCommentForArticle,
            {
                user: {
                    authData: {id: "1"}
                },
                articleDetails: {
                    data: {id: "1"}
                }
            }
        );
        thunk.api.post.mockReturnValue(Promise.resolve({data: comment}));

        const result = await thunk.callThunk('some_comment');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comment);
    });

    test('error send (failed to send error)', async () => {
        const thunk = new TestAsyncThunk(
            addCommentForArticle,
            {
                user: {
                    authData: {id: "1"}
                },
                articleDetails: {
                    data: {id: "1"}
                }
            }
        );

        thunk.api.post.mockReturnValue(Promise.resolve({status: 404}));
        const result = await thunk.callThunk('some_comment')

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('errors.ADD_COMMENT_REQUEST_FAILED');
    });

    test('error send (missing data error)', async () => {
        const thunk = new TestAsyncThunk(
            addCommentForArticle,
            {
                user: {
                    authData: {id: "1"}
                },
                articleDetails: undefined,
            }
        );

        thunk.api.post.mockReturnValue(Promise.resolve({status: 404}));
        const result = await thunk.callThunk('some_comment')

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('errors.ADD_COMMENT_INCORRECT_OR_MISSING_DATA');
    });
});
